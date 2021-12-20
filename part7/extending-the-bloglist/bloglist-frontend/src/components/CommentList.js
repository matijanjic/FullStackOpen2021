import React from 'react'

const CommentList = ({ blog }) => {
  if (!blog.comments) {
    return null
  } else {
    return (
      <ul>
        {blog.comments.map((comment, index) =>
          <li key={index}>
            {comment}
          </li>
        )}
      </ul>
    )
  }

}

export default CommentList