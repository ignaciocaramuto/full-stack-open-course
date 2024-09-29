const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]

    const biggerList = [
        {
            _id: '5a422aa71b54a676234d1801',
            title: 'Refactoring: Improving the Design of Existing Code',
            author: 'Martin Fowler',
            url: 'https://www.example.com/refactoring',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Understanding the Linux Kernel',
            author: 'Daniel P. Bovet',
            url: 'https://www.kernel.org/doc/gorman/pdf/understand.pdf',
            likes: 8,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d1800',
            title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
            author: 'Robert C. Martin',
            url: 'https://www.example.com/clean-code',
            likes: 12,
            __v: 0
        }
    ];
    

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