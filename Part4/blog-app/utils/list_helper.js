const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, current) =>  acc + current.likes, 0)
}

const favoriteBlog = (blogs) => {

    if (!blogs.length) {
        return null
    }

    const favoriteBlog = blogs.reduce((acc, current) => acc.likes > current.likes ? acc : current, {});

    return {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes
    }
}

const mostBlogs = (blogs) => {
    if (!blogs.length) {
        return null
    }

    const blogCount = {}
    let mostBlogs = 0
    let mostFrequentAuthor = ''

    for (const blog of blogs) {
        if (blogCount[blog.author]) {
            blogCount[blog.author] += 1
        } else {
            blogCount[blog.author] = 1
        }
    }

    for (const author in blogCount) {
        if (blogCount[author] > mostBlogs) {
            mostFrequentAuthor = author
            mostBlogs = blogCount[author]
        }
    }

    return { author: mostFrequentAuthor, blogs: mostBlogs }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }