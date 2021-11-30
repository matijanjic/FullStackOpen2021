var _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 1) {
    return blogs[0].likes
  } else {
    const reducer = (sum, item) => {
      return sum + item
    }
    return blogs.map(blog => blog.likes).reduce(reducer, 0)
  }
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return 'No blog posts provided'
  } else {
    const favorite = blogs.find(blog => blog.likes === Math.max(...blogs.map(blog => blog.likes)))
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
  }
}

const bestAuthor = (blogs) => {
  if (blogs === 0) return null

  const authorCount = _.chain(_.map(blogs, 'author')).countBy().toPairs().maxBy(_.last).value()
  return { author: authorCount[0], blogs: authorCount[1] }
}

const mostLikes = (blogs) => {
  if (blogs === 0) return null

  const authors = {}

  blogs.forEach(blog => {
    const author = blog.author
    const likes = blog.likes

    authors[author] ? authors[author] += likes : authors[author] = likes
  })

  const ordered = Object.keys(authors).sort()
  return {
    author: ordered[0],
    likes: authors[ordered[0]]
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, bestAuthor, mostLikes
}