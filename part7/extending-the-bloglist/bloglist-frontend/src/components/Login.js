import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/loginReducer'
import { Form, Button, Container } from 'react-bootstrap'

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
    <div className='mt-4'>
      <Container className='w-25'>
        <h2>log in</h2>
        <Form id='login-form' onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              id='username'
              type='text'
              value={username}
              name='username'
              onChange={({ target }) => setUsername(target.value)}
            />
            <Form.Label>password:</Form.Label>
            <Form.Control
              id='password'
              type='password'
              value={password}
              name='password'
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button variant='primary' className='mt-2' id='login-button' type='submit'>login</Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  )
}


export default Login