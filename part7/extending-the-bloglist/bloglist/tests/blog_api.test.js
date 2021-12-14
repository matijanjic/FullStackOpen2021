const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)
const helper = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('Blogs are returned in JSON format and in correct amount', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('Blogs have an id identifier', async () => {
  const blogList = await helper.blogsInDB()
  const blogToGet = blogList[0]
  const response = await api.get(`/api/blogs/${blogToGet.id}`)
  console.log(response.body)
  expect(response.body.id).toBeDefined()
})

test('POST request creates a new blog post', async () => {
  const newBlog = {
    title: 'New title added',
    author: 'Matija',
    url: 'www.localhost.com',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const newBlogList = await api.get('/api/blogs')
  expect(newBlogList.body).toHaveLength(helper.initialBlogs.length + 1)

  const titles = newBlogList.body.map(n => n.title)
  expect(titles).toContain(
    'New title added'
  )

})

test('Blog without likes defaults to 0', async () => {

  const blogWithoutLikes = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
  }
  const response = await api.post('/api/blogs').send(blogWithoutLikes).expect(200)
  expect(response.body.likes).toBe(0)

})

test('Blog without title and url will not be written and the response will be 400', async () => {
  const blogWithMissingFeatures = {
    author: 'Michael Chan'
  }

  await api.post('/api/blogs').send(blogWithMissingFeatures).expect(400)
})

test('Blog can be deleted', async () => {
  const blogsInDB = await helper.blogsInDB()
  const blogToDelete = blogsInDB[0]
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
  const blogsInDBEnd = await helper.blogsInDB()

  expect(blogsInDBEnd).toHaveLength(helper.initialBlogs.length - 1)
})

test('Blog can be updated', async () => {
  const blogList = await helper.blogsInDB()
  const blogToUpdate = blogList[0]
  blogToUpdate.likes = 40
  console.log(blogToUpdate)
  const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(202)
  console.log(response.body)

  const newBlogList = await helper.blogsInDB()
  const updatedBlog = newBlogList[0]
  expect(updatedBlog.likes).toBe(40)
})

describe('User testing', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    for (let user of helper.initialUsers) {
      let userObject = new User(user)
      await userObject.save()
    }
  })

  test('Adding a user with correct credentials succeeds', async () => {
    const user = {
      name: 'Matija',
      username: 'matijamatija',
      password: 'passwordpassword'
    }
    const initialState = await helper.usersInDB()
    await api
      .post('/api/users')
      .send(user)
      .expect(200)

    const finalState = await helper.usersInDB()
    console.log('initial state: ', initialState, ' final state: ', finalState)
    expect(initialState).toHaveLength(finalState.length - 1)

  })

  test('Adding a user with password under 3 chars credentials does not succeed', async () => {
    const shortPasswordUser = {
      name: 'Matija',
      username: 'matijamatija',
      password: 'pa'
    }
    const initialState = await helper.usersInDB()
    await api
      .post('/api/users')
      .send(shortPasswordUser)
      .expect(500)

    const finalState = await helper.usersInDB()
    console.log('initial state: ', initialState, ' final state: ', finalState)
    expect(initialState).toHaveLength(finalState.length)
  })

  test('Adding a user with already taken username does not succeed', async () => {
    const takenUsername = helper.initialUsers[0].username
    const alreadyTaken = {
      name: 'Matija',
      username: takenUsername,
      password: 'password'
    }

    const result = await api
      .post('/api/users')
      .send(alreadyTaken)
      .expect(400)

    expect(result.body.error).toContain('`username` to be unique')
  })

})


afterAll( async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 500))
  mongoose.connection.close()
})