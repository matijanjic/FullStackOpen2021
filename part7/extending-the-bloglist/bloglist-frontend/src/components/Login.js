import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/loginReducer'

const Login = () => {

  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    const user = {
      username: username,
      password: password
    }

    dispatch(setUser(user))
    setUsername('')
    setPassword('')
  }


  return(
    <div>
      <h2>log in to application</h2>
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