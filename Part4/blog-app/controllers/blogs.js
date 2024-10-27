const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs)
})

blogsRouter.post('', async (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.title || !blog.url || !blog.author) {
        return response.status(400).json({ error: 'title, author, and url are required' })
    }

    if (!blog.likes) {
        blog.likes = 0
    }

    const result = await blog.save();
    response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    const { id } = request.params

    const blog = await Blog.findById(id)

    if (!blog) {
        return response.status(404).json({ error: `blog with id ${id} doesn't exist in db` })
    }

    await Blog.deleteOne(blog)

    response.status(204).end()
})

module.exports = blogsRouter