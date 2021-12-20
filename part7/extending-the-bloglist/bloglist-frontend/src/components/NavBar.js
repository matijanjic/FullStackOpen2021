import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'
import { Nav, Navbar, Button, Container } from 'react-bootstrap'
import '../index.css'

const Navigation = () => {


  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.login)

  return (
    <Navbar collapseOnSelect expand="lg" bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Brand className='mb-1'>
        Blog App
      </Navbar.Brand>
      <Container>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto my-2 my-lg-2">
            <Nav.Link as={Link} to='/' className='navLink'>
              BLOGS
            </Nav.Link>
            <Nav.Link as={Link} to='/users' className='navLink' style={{ color: 'orange' }}>
              USERS
            </Nav.Link>
          </Nav>
          <Nav className='ml-auto'>
            <Navbar.Text style={{ lineHeight: 2 }}>{loggedUser.name} logged in</Navbar.Text>
            <Nav.Link>
              <Button variant='outline-warning'size='sm' onClick={() => dispatch(logout())}>log out</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation