import React , {useState,useContext} from 'react'
import WeatherContext from '../context/weatherContext'

 const SearchBox = () => {
        const weatherContext = useContext(WeatherContext)

        const [place, setplace] = useState('')

        // fetch data with searched name
        const searchPlace = e => {
               e.preventDefault();
               weatherContext.fetchData(place)
              setplace('')
        }

        const changeInputValue = (e) => {
               setplace(e.target.value)
        }
        
    return (
      
           <form className="searchBox" onSubmit={searchPlace}>
           <input type="search" name="search" id="search" placeholder="Search Places" onChange={changeInputValue} value={place} autoComplete='off'/>
           <i className="fas fa-search"></i>
           </form>
              
    )
}

export default SearchBox