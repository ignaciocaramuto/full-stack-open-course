const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

userRouter.get('', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!username ) {
      return response.status(400).json({ error: 'username missing' })
    }

    if (!password ) {
      return response.status(400).json({ error: 'password missing' })
    }

    if (username.length < 3) {
      return response.status(400).json({ error: 'username must be at least 3 characters long' })
    }

    if (password.length < 3) {
      return response.status(400).json({ error: 'password must be at least 3 characters long' })
    }

    const existingUser = await User.findOne({ username })

    if (existingUser) {
      return response.status(400).json({ error: `${username} already exists` })
    }
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
    })
  
    const savedUser = await user.save()
  
    response.status(201).json(savedUser)
})

module.exports = userRouter