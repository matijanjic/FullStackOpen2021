const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user' , { username: 1, name: 1 })
  response.json(blogs)
  logger.info('returned blog posts')
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  console.log(user)

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id
  })

  if (!blog.likes) {
    blog.likes = 0
  }
  if (!blog.title && !blog.url) {
    response.status(400).end()
  } else {
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    if (result) {
      response.status(200).json(result)
    }
  }
})

blogRouter.delete('/:id', async (request, response) => {

  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(404).json({ error: 'blog does not exist' }).end()
  }

  const creatorID = blog.user.toString()
  const userID = user.id.toString()



  if (userID === creatorID) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(202).end()
  } else {
    return response.status(404).json({ error: 'do not have credentials to delete the blog' })
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  console.log(body)

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  console.log(blog)

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(202).json(updatedBlog)
})

module.exports = blogRouter