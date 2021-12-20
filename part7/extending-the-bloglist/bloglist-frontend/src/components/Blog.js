import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {


  return(
    <>
      <td>
        <Link className='text-decoration-none' style={{ color: 'orange' }} to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
      </td>
      <td>
        <b> {blog.author}</b>
      </td>
    </>
  )
}

export default Blog