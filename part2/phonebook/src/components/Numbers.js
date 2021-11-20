import React from "react"

const Numbers = ({persons, search}) => {
    return (
      <div>{persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
        .map(person => <li key={person.name}>{person.name} {person.number}</li>)}</div>
    )
  }

export default Numbers