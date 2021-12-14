import React, { useState } from 'react'
const Blog = ({ blog, updateBlog, user, deleteBlog }) => {
  const[visible, setVisible] = useState(false)
  const[likes, setLikes] = useState(blog.likes)

  const increaseLikes = () => {
    console.log(likes)
    setLikes(likes + 1)

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      likes: likes + 1,
      user: blog.user.id,
      url: blog.url,
      id: blog.id
    }
    updateBlog(updatedBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 3,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
    width: 400
  }

  if (!visible) {
    return(
      <div style={blogStyle} className='blogTitleAndAuthor'>
        {blog.title} <b>{blog.author}</b>
        <button onClick={() => setVisible(!visible)}>show</button>
      </div>
    )
  } else {
    return(
      <div style={blogStyle} className='blogAllInfo'>
        <div>
          {blog.title} <b>{blog.author}</b>
          <button onClick={() => setVisible(!visible)}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div id='likes'>
          likes {likes}
          <button onClick={increaseLikes}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        {user.username === blog.user.username ? <button onClick={() => deleteBlog(blog)}>delete</button> : null}
      </div>
    )
  }

}

export default Blog