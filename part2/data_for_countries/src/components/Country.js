import React, {useState, useEffect} from "react"
import axios from 'axios'



const Weather = ({country}) => {

    const [weather, setWeather] = useState(null)
    
    const access_key = '74b70237dbd339dc1dc47a703b5080ac'

    const hook = () => {
        
        axios
          .get('http://api.openweathermap.org/data/2.5/weather?q=' + country.capital + '&appid=' + access_key + '&units=metric')
          .then(response => {
            console.log('promise fulfilled')
            console.log(response.data);
            setWeather(response.data)
          })
      }
    
      useEffect(hook,[country])

    return (
                <>
                <h2>Weather</h2>
                <div>Temperature: {weather && weather.main.temp}˚C</div>
                <div>Feels like: {weather && weather.main.feels_like}˚C</div>
                <div>Description: {weather && weather.weather[0].description}</div>
                </>
    )
}

const Country = ({country, state}) => {

    const [show, setShow] = useState(state)
    

    if (show) {

        return (
            <div>
                <h1>{country.name}</h1>
                <div>capital: {country.capital}</div>
                <div>population: {country.population}</div>
                <h2>Languages</h2>
                <div>
                {country.languages.map(language => 
                    <li key={language.name}>{language.name}</li>)}
                </div>
                <p>
                <img src={country.flags.png} alt={country.name+' flag'} width='150px'/>
                </p>
                <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button>
                <Weather country={country}/>
            </div>
        )
        }
        return (
            <div>
            {country.name} <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button>
            </div>
        )
    }

  export default Country