const mongoose = require('mongoose')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const app = express()
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB.')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB: ', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app