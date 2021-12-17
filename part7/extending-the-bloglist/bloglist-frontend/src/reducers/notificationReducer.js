const reducer = (state = { message: null, isError: false }, action) => {
  switch (action.type) {
  case 'SET_MESSAGE':
    return action.data
  case 'CLEAR':
    return { message: null, isError: false }
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

export const setNotification = (message, isError = false, seconds = 2) => {
  return async dispatch => {
    if (timeout) {
      clearTimeout(timeout)
    }
    const time = seconds * 1000
    dispatch({ type: 'SET_MESSAGE', data: { message: message, isError: isError } })
    timeout = setTimeout(() => dispatch(clearNotification()), time)

  }
}



export default reducer