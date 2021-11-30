const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password || body.password.length < 3) {
    response.status(500).json({ error: 'no password given or password too short' })
  } else {
    const saltRounds = 10
    const passHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passHash
    })

    const savedUser = await user.save()

    response.json(savedUser).status(200)
  }
})

module.exports = userRouter