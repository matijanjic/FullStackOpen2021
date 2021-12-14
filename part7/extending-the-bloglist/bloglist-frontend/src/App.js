import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import Error from './components/Error'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('JSONloginInfo')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user.token)

      blogService.setToken(user.token)
    }

  },[])

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('JSONloginInfo', JSON.stringify(user))
      blogService.setToken(user.token)
      console.log('handleLogin token set: ', user.token)

      setNotification('Successfully logged in')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong credentials. Try again.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('JSONloginInfo')
  }

  const handleBlogCreation = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setNotification(`A new blog ${blogObject.title} by ${blogObject.author} created.`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Not a valid blog post. Make sure url and/or title are not missing.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async updatedBlog => {
    await blogService.update(updatedBlog)
  }

  const deleteBlog = async blogToDelete => {
    const result = window.confirm(`Remove blog ${blogToDelete.title}?`)
    if (result) {
      await blogService.remove(blogToDelete)
      setBlogs(blogs.filter(b => b.id !== blogToDelete.id))
    }

  }

  const loginForm = () => (
    <Login logIn={handleLogin}/>
  )

  const submitBlogForm = () => (
    <Toggleable buttonLabel='create new blog' ref={blogFormRef}>
      <CreateBlog submitBlog={handleBlogCreation}/>
    </Toggleable>
  )

  return (
    <div>
      <Notification message={notification}/>
      <Error message={errorMessage}/>
      {user === null
        ? loginForm()
        : <div>
          <h1>Blogs</h1>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>log out</button>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>
          )}
          {submitBlogForm()}
        </div>
      }
    </div>
  )
}

export default App