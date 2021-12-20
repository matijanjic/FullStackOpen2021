import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import Toggleable from './Toggleable'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'
import { Form, Button } from 'react-bootstrap'

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
        <h2 className='mt-4'>Add a new blog</h2>
        <Form onSubmit={handleBlogCreation} className='blogForm w-25'>
          <Form.Group>
            <Form.Label>title:</Form.Label>
            <Form.Control {...title.properties } />
            <Form.Label>author:</Form.Label>
            <Form.Control {...author.properties } />
            <Form.Label>url:</Form.Label>
            <Form.Control {...url.properties } />
          </Form.Group>

          <Button id='submit-blog' type='submit' className='mt-4'>create</Button>
        </Form>
      </div>
    </Toggleable>
  )
}

export default CreateBlog