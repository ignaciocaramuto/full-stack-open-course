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

module.exports = { dummy, totalLikes, favoriteBlog }