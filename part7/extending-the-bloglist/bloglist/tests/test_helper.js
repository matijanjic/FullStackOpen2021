const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
]

const initialUsers = [
  {
    name: 'Matija',
    username: 'usernameMatija',
    password: 'password1234'
  },
  {
    name: 'Matija2',
    username: 'usernameMatija2',
    password: 'password1234'
  },
  {
    name: 'Matija3',
    username: 'usernameMatija3',
    password: 'password1234'
  },
]

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}



const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDB, initialUsers, usersInDB }