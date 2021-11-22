import React from "react"
import phonebookServices from "../services/phonebookServices"

const Numbers = ({persons, search, setPersons}) => {

  const deletePerson = (id,name) => {
    if(window.confirm(`Are you sure you want to delete ${name}?`)) {
    phonebookServices
      .del(id)
      setPersons(persons.filter(person => person.id !== id))
    }

  }
    return (
      <div>{persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
        .map(person => 
        <li key={person.name}>{person.name} {person.number}
        <button onClick={() => deletePerson(person.id,person.name)}>delete</button>
        </li>
        
        )}</div>
    )
  }

export default Numbers