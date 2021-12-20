import React from 'react'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const commentField = useField('comment', 'text')

  const addNewComment = (event) => {
    event.preventDefault()
    console.log(commentField.properties.value)
    dispatch(addComment(blog, commentField.properties.value))
    commentField.clearField()
  }

  return (
    <div>
      <form onSubmit={addNewComment}>
        <input { ...commentField.properties }/>
        <button type='submit'>add comment</button>
      </form>
    </div>
  )
}

export default CommentForm