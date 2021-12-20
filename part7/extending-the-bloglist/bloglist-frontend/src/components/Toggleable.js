import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Toggleable = React.forwardRef((props, ref) => {

  Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant='danger' className='mt-2' onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'

export default Toggleable