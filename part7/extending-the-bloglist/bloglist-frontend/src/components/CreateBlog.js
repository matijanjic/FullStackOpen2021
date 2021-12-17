import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import Toggleable from './Toggleable'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'

const CreateBlog = () => {

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const title = useField('title')
  const author = useField('author')
  const url = useField('url')

  const handleBlogCreation = (event) => {
    event.preventDefault()

    const blog = {
      title: title.properties.value,
      author: author.properties.value,
      url: url.properties.value
    }

    try {
      blogFormRef.current.toggleVisibility()
      dispatch(addBlog(blog))
      dispatch(setNotification(`A new blog ${blog.title} by ${blog.author} created.`))
    } catch (exception) {
      dispatch(setNotification('Not a valid blog post. Make sure url and/or title are not missing.', true))
    }
    title.clearField()
    author.clearField()
    url.clearField()
  }

  return(
    <Toggleable buttonLabel='create new blog' ref={blogFormRef}>
      <div>
        <h1>Create new</h1>
        <form onSubmit={handleBlogCreation} className='blogForm'>
          <div>
          title:
            <input {...title.properties}/>
          </div>
          <div>
          author:
            <input { ...author.properties }/>
          </div>
          <div>
          url:
            <input { ...url.properties }/>
          </div>
          <button id='submit-blog' type='submit'>create</button>
        </form>
      </div>
    </Toggleable>
  )
}

export default CreateBlog