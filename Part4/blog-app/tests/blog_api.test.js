const { test, after, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { MONGODB_URI } = require('../utils/config')
const { initialBlogs, nonExistingId, blogsInDb } = require('./test_helper.js')

beforeEach(async () => {  
    await mongoose.connect(MONGODB_URI)
    await Blog.deleteMany({})
    for (const blog of initialBlogs) {
        const blogObject = new Blog(blog)
        await blogObject.save()
    }
})

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

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('Canonical string reduction'))
})

test('blog without title is not added', async () => {
    const newBlog = {
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await blogsInDb()
  
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
})

test('blog without url is not added', async () => {
    const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await blogsInDb()
  
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
})

test('blogs unique identifier is called id', async () => {
    const blogsAtEnd = await blogsInDb()
    assert.ok(blogsAtEnd.every((blog) => blog.id))
})

test('blog created without likes defaults value to 0', async () => {
    const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
    }

    await api.post('/api/blogs').send(newBlog)

    const blogsAtEnd = await blogsInDb()

    assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
})

afterEach(async () => {
  await mongoose.connection.close()
})