import { useState } from 'react'

export const useField = (id, type = 'text') => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clearField = () => {
    setValue('')
  }

  return {
    properties: {
      id,
      value,
      type,
      onChange
    },
    clearField
  }
}