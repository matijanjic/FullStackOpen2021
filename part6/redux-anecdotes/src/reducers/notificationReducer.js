const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.data
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}

let timeout = undefined

export const setNotification = (message, seconds = 2) => {
  return async dispatch => {
    if (timeout) {
      clearTimeout(timeout)
    }
    const time = seconds * 1000
    await dispatch({ type: 'SET_MESSAGE', data: message })
    timeout = setTimeout(() => dispatch(clearNotification()), time)
    
  }
}



export default reducer