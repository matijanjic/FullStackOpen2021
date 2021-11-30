const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2
  },
  username: {
    type: String,
    minlength: 3,
    required: true
  },
  passHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passHash
  }
})

const User = mongoose.model('User', userSchema)



module.exports = User