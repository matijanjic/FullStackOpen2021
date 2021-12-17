import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = () => {

  const loggedUser = useSelector(state => state.login)
  const blogs = useSelector(state => state.blogs)

  return(
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={loggedUser}/>
      )}
    </div>
  )
}

export default BlogList
