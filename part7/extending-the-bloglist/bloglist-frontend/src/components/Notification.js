import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const message = useSelector(state => state.notification.message)
  const isError = useSelector(state => state.notification.isError)

  if (message === null) {
    return null
  } else if (isError) {
    return (
      <div className="error">
        {message}
      </div>
    )
  } else {
    return (
      <div className="notification">
        {message}
      </div>
    )
  }
}

export default Notification