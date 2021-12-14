import React, { useState } from 'react'

const CreateBlog = ({ submitBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreation = (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url
    }
    submitBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h1>Create new</h1>
      <form onSubmit={handleBlogCreation} className='blogForm'>
        <div>
          title:
          <input id='title' value={title} type='text' onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          author:
          <input id='author' value={author} type='text' onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          url:
          <input id='url' value={url} type='text' onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button id='submit-blog' type='submit'>create</button>
      </form>
    </div>
  )
}

export default CreateBlog