const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { listWithOneBlog, blogs } = require('./data/dummy-blogs')

test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })

describe('total likes', () => {

    test('of empty list is zero', () => {
        assert.strictEqual(listHelper.totalLikes([]), 0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 36)
    })
})

describe('favorite blog', () => {

    test('of empty list is undefined', () => {
        assert.strictEqual(listHelper.favoriteBlog([]), null)
    })

    test('when list has only one blog equals the blog', () => {
        const result = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
        assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), result)
    })

    test('of a bigger list is calculated right', () => {
        const result = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }
        assert.deepStrictEqual(listHelper.favoriteBlog(blogs), result)
    })
})

describe('most blogs', () => {

    test('of empty list is undefined', () => {
        assert.strictEqual(listHelper.mostBlogs([]), null)
    })

    test('when list has only one blog equals the blog', () => {
        const result = {
            author: 'Edsger W. Dijkstra',
            blogs: 1
        }
        assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), result)
    })

    test('of a bigger list is calculated right', () => {
        const result = {
            author: "Robert C. Martin",
            blogs: 3
        }
        assert.deepStrictEqual(listHelper.mostBlogs(blogs), result)
    })
})