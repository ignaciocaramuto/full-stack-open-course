const { test, beforeEach, after, describe, before } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { initialBlogs, blogsInDb } = require('./test_helper.js')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

beforeEach(async () => {  
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

describe('requests without authorization', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('there are two blogs', async () => {
        const blogsAtEnd = await blogsInDb()
    
        assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
    })
    
    test('the first blog is about react patterns', async () => {
        const blogsAtEnd = await blogsInDb()
    
        const contents = blogsAtEnd.map(e => e.title)
        assert(contents.includes('React patterns'))
    })

    test('blogs unique identifier is called id', async () => {
        const blogsAtEnd = await blogsInDb()
        
        assert.ok(blogsAtEnd.every((blog) => blog.id))
    })
})

describe('requests with authorization', () => {
    const user = {
        username: 'root',
        password: 'sekret'
    }

    const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    }

    const newBlogWithoutTitle = {
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    }

    const newBlogWithoutUrl = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
    }

    const newBlogWithoutLikes = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
    }

    let token = '';

    before(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash(user.password, 10)
        const userToSave = new User({ username: user.username, passwordHash })
        await userToSave.save()
        const response = await api.post('/api/login').send(user)
        token = response.body.token
    })

    test('a valid blog can be added', async () => {    
        await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await blogsInDb()
        assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)
    
        const titles = blogsAtEnd.map(b => b.title)
        assert(titles.includes('Canonical string reduction'))
    })

    test('blog without title is not added', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlogWithoutTitle)
            .expect(400)
      
        const blogsAtEnd = await blogsInDb()
      
        assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
    })

    test('blog without url is not added', async () => {      
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlogWithoutUrl)
            .expect(400)
      
        const blogsAtEnd = await blogsInDb()
      
        assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
    })

    test('blog created without likes defaults value to 0', async () => {    
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlogWithoutLikes)
    
        const blogsAtEnd = await blogsInDb()
    
        assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
    })

    test('deletion of a blog is successful', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)

        const blogsAtStart = await blogsInDb()
        const idToDelete = blogsAtStart[blogsAtStart.length - 1].id
    
        await api
            .delete(`/api/blogs/${idToDelete}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)
    
        const blogsAtEnd = await blogsInDb()
        
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    })

    test('can update a blog', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)

        const blogsAtStart = await blogsInDb()
        const blog = blogsAtStart[blogsAtStart.length - 1]
        blog.likes = 15
    
        await api
            .put(`/api/blogs/${blog.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await blogsInDb()
        
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
        assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, blog.likes)
    })

    test('cannot update a blog without likes property', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)

        const blogsAtStart = await blogsInDb()
    
        await api
            .put(`/api/blogs/${blogsAtStart[blogsAtStart.length - 1].id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({})
            .expect(400)
    
        const blogsAtEnd = await blogsInDb()
        
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
})

after(async () => {
  await mongoose.connection.close()
})