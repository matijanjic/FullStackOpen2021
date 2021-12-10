import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  
  
  const handleChange = (event) => {
    const filter = event.target.value
    props.setFilter(filter)
  }

  return (
    <div>
      filter
      <input onChange={handleChange}/>
    </div>
  )
}


export default connect(null, { setFilter })(Filter)