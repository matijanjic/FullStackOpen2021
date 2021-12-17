import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'

const NavBar = () => {

  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.login)

  const navStyle = {
    listStyleType: 'none',
    margin: 0,
    padding: 10,
    overflow: 'hidden',
    backgroundColor: '#333333',
  }

  const liStyle = {
    float: 'left',
    paddingLeft: 10,
    color: 'white',
    textDecoration: 'none'
  }

  const liStyleA = {
    color: 'lightBlue',
    textDecoration: 'none'
  }

  return (
    <ul style={navStyle}>
      <li style={liStyle}><Link style={liStyleA} to='/'>blogs </Link></li>
      <li style={liStyle}><Link style={liStyleA} to='/users'>users </Link></li>
      <li style={liStyle}>{loggedUser.name} logged in</li>
      <li style={liStyle}><button onClick={() => dispatch(logout())}>log out</button></li>
    </ul>
  )
}

export default NavBar