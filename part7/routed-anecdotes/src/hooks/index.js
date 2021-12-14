import { useState } from 'react'

export const useField = (type, name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  } 

  const clearField = () => {
    
    setValue('')
  }

  return {
    properties: {
      name,
      type,
      onChange,
      value
    },
    clearField
  }
}