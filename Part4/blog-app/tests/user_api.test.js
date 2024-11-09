
const { test, beforeEach, describe, after } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { usersInDb } = require('./test_helper.js')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await usersInDb()
  
        const newUser = {
            username: 'ignaciocaramuto',
            name: 'Ignacio Caramuto',
            password: '123456',
        }
  
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
  
        const usersAtEnd = await usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails when username and password are invalid', async () => {
        const usersAtStart = await usersInDb()

        const invalidUser = {
            username: 'ig',
            name: 'Ignacio Caramuto',
            password: '12',
        }

        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
        
        const usersAtEnd = await usersInDb()

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails if username already exists', async () => {

        const newUser = {
            username: 'ignaciocaramuto',
            name: 'Ignacio Caramuto',
            password: '123456',
        }

        await api
            .post('/api/users')
            .send(newUser)

        const usersAtStart = await usersInDb()
        
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        const usersAtEnd = await usersInDb()

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})