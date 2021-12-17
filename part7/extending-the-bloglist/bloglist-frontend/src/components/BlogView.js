import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { likeBlog, delBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogView = ({ blogID }) => {

  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === blogID)
  const loggedUser = useSelector(store => store.login)

  const dispatch = useDispatch()

  const deleteBlog = async blogToDelete => {
    const result = window.confirm(`Remove blog ${blogToDelete.title}?`)
    if (result) {
      dispatch(delBlog(blogToDelete.id))
    }
    dispatch(setNotification('blog deleted.'))
  }

  if(!blog) {
    return(
      <Redirect to='/' />
    )
  } else {
    return(
      <div>
        <h2>{blog.title}</h2>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>{blog.likes} likes<button onClick={() => dispatch(likeBlog(blog))}>like</button></div>
        <div>added by {blog.user.name}</div>
        {loggedUser.username === blog.user.username ? <button onClick={() => deleteBlog(blog)}>delete</button> : null}
      </div>
    )
  }

}

export default BlogView