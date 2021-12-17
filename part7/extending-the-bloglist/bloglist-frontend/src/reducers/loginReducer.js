//import loginService from '../services/login'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_USER':
    return action.data
  case 'REMOVE_USER':
    return null
  default:
    return state
  }
}

export const checkLocalStorage = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('JSONloginInfo')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user.token)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user
      })
    }
  }
}

export const setUser = (userObject) => {
  return async dispatch => {
    try {
      const user = await loginService.login(userObject)
      dispatch(setNotification('Successfully logged in'))
      window.localStorage.setItem('JSONloginInfo', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user
      })
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', true))
    }
  }
}

export const logout = () => {
  return ({
    type: 'REMOVE_USER'
  })
}

export default reducer