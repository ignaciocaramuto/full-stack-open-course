const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

blogsRouter.get('', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1});
    response.json(blogs)
})

blogsRouter.post('', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const { title, url, author, likes } = request.body

    if (!title || !url || !author) {
        return response.status(400).json({ error: 'title, author, and url are required' })
    }

    const blog = new Blog({
        title,
        url,
        author,
        likes: likes ?? 0,
        user: user.id
    })

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const { id } = request.params
    const blog = await Blog.findById(id)

    if (!blog) {
        return response.status(404).json({ error: `blog with id ${id} doesn't exist in db` })
    }

    if (blog.user.toString() !== decodedToken.id.toString()) {
        return response.status(401).json({ error: `blog doesn't belong to user` })
    }

    await Blog.deleteOne(blog)

    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const { id } = request.params
    const { likes } = request.body

    const blog = await Blog.findById(id)

    if (!blog) {
        return response.status(404).json({ error: `blog with id ${id} doesn't exist in db` })
    }

    if (!likes) {
        return response.status(400).json({ error: `likes property is missing` })
    }

    const result = await Blog.findByIdAndUpdate(id,
        { likes },
        { new: true, runValidators: true, context: 'query' }
    )

    response.status(200).json(result)
})

module.exports = blogsRouter