import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import Numbers from './components/Numbers'
import phonebookServices from './services/phonebookServices'
import Notification from './components/Notification'
import Error from './components/Error'

//npm install json-server --save-dev
//"server": "json-server -p3001 --watch db.json"
//npm run server

const App = () => {
  const [ persons, setPersons ] = useState([])  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ notification, setNotification] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    phonebookServices
      .getAll()
      .then(initPhonebook => {
        setPersons(initPhonebook)
      })
  }

  useEffect(hook,[])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('adding person', newName);
    const newPerson = {
      name: newName,
      number: newNumber
      
    }
    if (persons.some(person => person.name === newName)) {
      const confirmation = window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)
      if (confirmation) {
        const idToUpdate = persons.find(person => person.name === newPerson.name).id
        setNotification(`updated ${newName} with new number ${newNumber}`)
        setTimeout(() => {
          setNotification(null)
        },5000)
        
        phonebookServices
          .update(idToUpdate,newPerson)
          .then(returnedPerson=> {
            setPersons(persons.map(person => person.id !== idToUpdate ? person : returnedPerson))
          })
          .catch(error => {
            setNotification(null)
            setErrorMessage(`person ${newPerson.name} was already deleted.`)
            setTimeout(() => {  
              setErrorMessage(null)
            },5000)
          })
        
      }
    }
    else {
      phonebookServices
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          console.log('done setting persons');
        })
      setNewName('')
      setNewNumber('')
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Error message={errorMessage}/>
      <Filter handleSearchChange={handleSearchChange}/>
      <h2>Add new</h2>
      <AddPerson addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} search={search} setPersons={setPersons}/>
    </div>
  )
}

export default App