import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { likeBlog, delBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

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
  console.log(blog)


  if(!blog) {
    return(
      null
    )
  } else if (!loggedUser) {
    return(
      <Redirect to='/' />
    )
  } else {
    return(
      <div>
        <h2 className='mt-4'>{blog.title}</h2>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>{blog.likes} likes <button onClick={() => dispatch(likeBlog(blog))}>like</button></div>
        <div>added by {blog.user.name}</div>
        {loggedUser.username === blog.user.username ? <button onClick={() => deleteBlog(blog)}>delete</button> : null}
        <CommentForm blog={blog} />
        <h4 className='mt-4'>Comments</h4>
        <CommentList blog={blog} />
      </div>
    )
  }

}

export default BlogView