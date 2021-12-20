import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {

  const message = useSelector(state => state.notification.message)
  const isError = useSelector(state => state.notification.isError)

  if (message === null) {
    return null
  } else if (isError) {
    return (
      <Alert variant="danger">
        {message}
      </Alert>
    )
  } else {
    return (
      <Alert variant="success">
        {message}
      </Alert>
    )
  }
}

export default Notification