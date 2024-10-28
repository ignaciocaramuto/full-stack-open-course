const { test, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { MONGODB_URI } = require('../utils/config')
const { initialBlogs, blogsInDb } = require('./test_helper.js')

beforeEach(async () => {  
    await mongoose.connect(MONGODB_URI)
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
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
    console.log(blogsAtEnd);
    
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

test('deletion of a blog is successful', async () => {
    const blogsAtStart = await blogsInDb()
    const idToDelete = blogsAtStart[0].id

    await api
        .delete(`/api/blogs/${idToDelete}`)
        .expect(204)

    const blogsAtEnd = await blogsInDb()
    
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)
})

test('can update a blog', async () => {
    const blogsAtStart = await blogsInDb()
    const id = blogsAtStart[0].id
    const blog = blogsAtStart[0]
    blog.likes = 15

    await api
        .put(`/api/blogs/${id}`)
        .send(blog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
    assert.strictEqual(blogsAtEnd[0].likes, blog.likes)
})

test('cannot update a blog without likes property', async () => {
    const blogsAtStart = await blogsInDb()

    await api
        .put(`/api/blogs/${blogsAtStart[0].id}`)
        .send({})
        .expect(400)

    const blogsAtEnd = await blogsInDb()
    
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
})

afterEach(async () => {
  await mongoose.connection.close()
})