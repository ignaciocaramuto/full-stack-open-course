const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { listWithOneBlog, biggerList } = require('./data/dummy-blogs')

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
        const result = listHelper.totalLikes(biggerList)
        assert.strictEqual(result, 25)
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
            title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
            author: 'Robert C. Martin',
            likes: 12
        }
        assert.deepStrictEqual(listHelper.favoriteBlog(biggerList), result)
    })
})