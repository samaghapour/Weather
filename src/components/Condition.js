import React , {useContext} from 'react'
import WeatherContext from '../context/weatherContext'
// import icon pngs
import snow from '../weatherIcons/snow.png'
import rain from '../weatherIcons/rain.png'
import cloudSun from '../weatherIcons/cloudSun.png'
import cloudNight from '../weatherIcons/cloudNight.png'
import moon from '../weatherIcons/moon.png'
import sun from '../weatherIcons/sun.png'

 const Condition = () => {
     
    const weatherContext = useContext(WeatherContext)

    const {Name,Weather,Hour,Temp,Time,Country,SunSetHour,SunRiseHour} = weatherContext;

    //change icons depend on weather and hour
    const changeIcon = (hour,weather,sunset,sunrise) => {

        // conditions for icons
      if( (hour < sunrise || hour >= sunset) && weather === 'Clear'){
        return (moon)
      } else if(hour <  sunset && hour >= sunrise &&  weather === 'Clear') {
        return( sun)
      } else if((hour < sunrise || hour >= sunset) &&  weather === 'Clouds') {
        return( cloudNight)
      } else if(hour <  sunset && hour >= sunrise && weather === 'Clouds') {
        return( cloudSun)
      } else if(((hour < sunrise || hour >= sunset) || hour <  sunset && hour >= sunrise) && weather === 'Rain') {
        return( rain)
      } else if(((hour < sunrise || hour >= sunset) || hour <  sunset && hour >= sunrise) && weather === 'moon') {
        return(snow)
      } else {
          return(sun)
      }

    }

    return (
        <div className="weatherConditionsBox">
            <div className="conditionBox">
            <p className="time">{Time} </p>
            <h2 className="name">{Name} </h2>
            <sup>Country: {Country}</sup>
            <h1 className="temp"> {Temp} <sup>°</sup>C</h1>
            </div>
            <div className="iconBox">
            <img alt='weatherIcon' src={changeIcon(Hour,Weather,SunSetHour,SunRiseHour)} className='icon'></img>
            <h4 className="description">{Weather}</h4>
            </div>
        </div>
      
    )
}

export default Condition