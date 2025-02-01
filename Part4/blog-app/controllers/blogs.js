const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs)
})

blogsRouter.post('', userExtractor, async (request, response) => {
  const { user } = request
  const { title, url, author, likes } = request.body

  if (!title || !url || !author) {
    return response.status(400).json({ error: 'title, author, and url are required' })
  }

  const newBlog = new Blog({
    title,
    url,
    author,
    likes: likes ?? 0,
    user: user.id
  })

  const savedBlog = await newBlog.save();

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const blog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })

  response.status(201).json(blog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const { user } = request
  const { id } = request.params
  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(404).json({ error: `blog with id ${id} doesn't exist in db` })
  }

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: `blog doesn't belong to user` })
  }

  await Blog.deleteOne(blog)

  response.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const { user } = request
  const { id } = request.params
  const { likes } = request.body

  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(404).json({ error: `blog with id ${id} doesn't exist in db` })
  }

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: `blog doesn't belong to user` })
  }

  if (!likes) {
    return response.status(400).json({ error: `likes property is missing` })
  }

  const result = await Blog.findByIdAndUpdate(id,
    { likes },
    { new: true, runValidators: true, context: 'query' }
  ).populate('user', { username: 1, name: 1 })

  response.status(200).json(result)
})

module.exports = blogsRouter
