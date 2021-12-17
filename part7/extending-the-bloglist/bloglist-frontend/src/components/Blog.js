import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 3,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
    width: 400
  }

  return(
    <div style={blogStyle} className='blogTitleAndAuthor'>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title}
      </Link>
      <b> {blog.author}</b>
    </div>
  )
}

export default Blog