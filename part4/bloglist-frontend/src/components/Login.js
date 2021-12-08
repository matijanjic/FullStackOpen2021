import React, { useState } from 'react'

const Login = ({ logIn }) => {

  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    const user = {
      username: username,
      password: password
    }

    logIn(user)
    setUsername('')
    setPassword('')
  }

  return(
    <div>
      <h1>log in to application</h1>
      <form id='login-form' onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login