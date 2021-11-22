import React, {useEffect, useState} from 'react';
import axios from 'axios'
import ListCountries from './components/ListCountries';


function App() {

  const hook = () => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  useEffect(hook,[])
  
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState([])

  const handleInputChange = (event) => {
    const search = event.target.value
    setShowCountries(countries.filter(country => 
      country.name.toLowerCase().includes(search.toLowerCase())))
  }

  return (
    <div>
    <div>
      find countries: <input onChange={handleInputChange}/>
    </div>
    <ListCountries showCountries={showCountries}/>
    </div>
  );
}

export default App;
