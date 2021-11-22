import React,{useState} from "react"
import Country from "./Country"

const ListCountries = ({showCountries}) => {

    

    if (showCountries.length > 10) {
      return (
        <div>Too many matches, please specify another filter</div>
      )
    }
  
    else if (showCountries.length > 1) {
    return (
      <div>
        {showCountries.map(showCountry => 
        <Country country={showCountry} state={false}/>)}
      </div>
    )
    }
  
    else if (showCountries.length === 1) {
        return (
            
            <Country country={showCountries[0]} state={true}/>
            
        )
    }
  
    else return <></>
    
  }
export default ListCountries