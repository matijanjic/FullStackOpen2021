import React from "react"

const Filter = ({handleSearchChange}) => {
    return (
      <>
      filter shown with: <input onChange={handleSearchChange}/>
      </>
    )
  }

export default Filter