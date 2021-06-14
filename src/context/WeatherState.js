import React , {useReducer,useEffect} from 'react'
import WeatherContext from './weatherContext'
import WeatherReducer from './WeatherReducer'
import {format} from 'date-fns';
import {SEARCH_DATA} from './types'

// images
import night from '../images/night.jpg'
import day from '../images/day.jpg'
import cloudyDay from '../images/cloudyDay.jpg'
import cloudyNight from '../images/cloudyNight.jpg'
import rainDay from '../images/rainDay.jpg'
import rainNight from '../images/rainNight.jpg'
import snowingDay from '../images/snowingDay.jpg'
import snowingNight from '../images/snowingNight.jpg'



const WeatherState = props => {
  //initial states
    const initialState = {
        Name: '',
        Country: '',
        Weather: '',
        Hour: null,
        Temp: null,
        Time: null,
        Data: [],
        CurrentDetails: {},
        Wind: {},
        SunSetHour: null,
        SunRiseHour: null
    }
  
    const [state,dispatch] = useReducer(WeatherReducer,initialState)

  //fetch data fram local storage
    useEffect( () => {
      if(JSON.parse(localStorage.getItem('location')) === null){
        fetchData('london')
      }else{
        const loc = JSON.parse(localStorage.getItem('location'))
        fetchData(loc)
      }
        //eslint-disable-next-line
    },[])

    // get realTime of city | country
    const GetTimeZone = timezone => {
        const now = new Date()
        const utc = new Date(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds(),
          now.getUTCMilliseconds()
        ).getTime();
  
        return new Date(utc + timezone * 1000)
      }

      // switch background depend on hour and weather description
      const switchBackground = (hour,sunset,sunrise,weather) => {
      
        // conditions for background
        if((hour < sunrise || hour >= sunset) && weather === 'Clear'){
          document.body.style.background = `url(${night}`
        } else if(hour <  sunset && hour >= sunrise &&  weather ==='Clear') {
          document.body.style.background = `url(${day}`
        } else if((hour < sunrise || hour >= sunset) && weather === 'Clouds') {
          document.body.style.background = `url(${cloudyNight}`
        } else if(hour <  sunset && hour >= sunrise &&  weather ==='Clouds') {
          document.body.style.background = `url(${cloudyDay}`
        } else if((hour < sunrise || hour >= sunset) && weather === 'Rain') {
          document.body.style.background = `url(${rainNight}`
        } else if(hour <  sunset && hour >= sunrise &&  weather ==='Rain') {
          document.body.style.background = `url(${rainDay}`
        } else if((hour < sunrise || hour >= sunset) && weather === 'Snow') {
          document.body.style.background = `url(${snowingNight}`
        } else if(hour <  sunset && hour >= sunrise &&  weather ==='Snow') {
          document.body.style.background = `url(${snowingDay}`
        }else {
          document.body.style.background = '#f4f4f4'
        }
        
        // conditions for font color
        if(hour < sunrise || hour >= sunset){
          document.body.style.color = 'rgb(224, 224, 219)'
          document.querySelectorAll('.date').forEach(item => item.style.color = 'rgb(224, 224, 219)')
          document.querySelectorAll('span').forEach(item => item.style.color = 'rgb(224, 224, 219)')
          document.querySelectorAll('h3').forEach(item =>  item.style.borderBottom = '1px solid rgb(224, 224, 219)')
          document.querySelector('h5').style.borderBottom = '1px solid rgb(224, 224, 219)'
          
          document.getElementById('search').style.color = 'rgb(224, 224, 219)'

          
          document.querySelector('.weatherConditionsBox').style.background = 'rgba(115, 113, 113, 0.15)'
          document.getElementById('search').style.background = 'rgba(115, 113, 113, 0.15)'
          document.getElementById('search').className = 'darkSearch'
          document.querySelector('.weatherTable').style.background = 'rgba(115, 113, 113, 0.15)'
          document.querySelector('.sideTwo').style.background = 'rgba(115, 113, 113, 0.3)'
          
        }else {
          document.body.style.color = 'black'
          document.querySelectorAll('.date').forEach(item => item.style.color = 'black')
          document.querySelectorAll('span').forEach(item => item.style.color = 'black')
          document.querySelectorAll('h3').forEach(item =>  item.style.borderBottom = '1px solid black')
          document.querySelector('h5').style.borderBottom = '1px solid black'
          
          document.getElementById('search').style.color = 'black'
          document.getElementById('search').className = 'lightSearch'
          document.querySelector('.weatherConditionsBox').style.background = 'rgba(255, 255, 255, 0.15)'
          document.getElementById('search').style.background = 'rgba(255, 255, 255, 0.15)'
          document.querySelector('.weatherTable').style.background = 'rgba(255, 255, 255, 0.15)'
          document.querySelector('.sideTwo').style.background = 'rgba(240, 240, 240, 0.3)'
        }

        document.body.style.backgroundPosition = 'center center'
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundAttachment = 'fixed'
  
      };

      // fetch data 
      const fetchData = async (place) => {
        // set searched location name in local storage
        localStorage.setItem('location',JSON.stringify(place))

        //loading on
        document.getElementById('loadingBox').style.display = 'block'

        const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=4091df4160d65560503dae4aa27e3b2c`)

        const data = await res.json()

        // loading off
        document.getElementById('loadingBox').style.display = 'none'


           if(data.cod !== '200'){
             // if searched place doesn't found
               alert('no place found!')
           } else {
             //set needed data into object
            let dataOBJ = new function (){
                this.timezone = GetTimeZone(data.city.timezone);
                this.hour = this.timezone.getHours();
                this.weather = data.list[0].weather[0].main;
                this.temp =(data.list[0].main.temp - 273.15).toFixed(1);
                this.name = data.city.name;
                this.country = data.city.country;
                this.time =  format(this.timezone,'eee PP HH:mm');
                this.sunset = data.city.sunset;
                this.sunrise = data.city.sunrise;
                this.data = data.list;
                    // get sunset time
                this.SunsetTime =new Date(
                 this.sunset * 1000 +
                 new Date().getTimezoneOffset() * 60000 +
                 data.city.timezone * 1000
                 );
                    //get sunrise time
                this.SunriseTime =new Date(
                    this.sunrise * 1000 +
                 new Date().getTimezoneOffset() * 60000 +
                 data.city.timezone * 1000
                 );
                    // calc percentage of passed time
                this.processWidth = () =>{
                  const a = this.timezone.getHours() - this.SunriseTime.getHours()
                  const b = 100 /  (this.SunsetTime.getHours() - this.SunriseTime.getHours())
                  return a * b
                };
                    // just hour of sunset & sunrise time
                this.sunsetTimeNumber = this.SunsetTime.getHours();
                this.sunriseTimeNumber = this.SunriseTime.getHours();
                    
                    //current details of weather
                this.CurrentDetails = {
                 humidity: data.list[0].main.humidity + '%',
                 pressure: data.list[0].main.pressure + ' mBar',
                 visibility: (data.list[0].visibility / 1000) + ' km',
                 sunrise: format(this.SunriseTime,'HH:mm aa'),
                 sunset: format(this.SunsetTime,'HH:mm aa'),
                 processWidth: this.processWidth(),
                 time: this.timezone.getHours(),
                 sunriseHour: this.SunriseTime.getHours()
                 };
                    //wind details of weather
                this.wind = {
                 deg : data.list[0].wind.deg,
                 speed : Number(data.list[0].wind.speed.toFixed(0)),
                 gust : data.list[0].wind.gust,
                 lastUpdate: data.list[0].dt_txt.substr(10)
                 };
            }
                  //dispatch needed data object
                dispatch({type:SEARCH_DATA,peyload: dataOBJ})
            
            // switch background depend on weather and hour
            switchBackground(dataOBJ.hour,dataOBJ.sunsetTimeNumber,dataOBJ.sunriseTimeNumber,dataOBJ.weather)
           }

      }


    return <WeatherContext.Provider value={
        { Name: state.Name,
        Country:  state.Country,
        Weather:  state.Weather,
        Hour:  state.Hour,
        Temp: state.Temp,
        Time:  state.Time,
        Data:  state.Data,
        CurrentDetails:state.CurrentDetails,
        Wind:  state.Wind,
        SunSetHour:  state.SunSetHour,
        SunRiseHour: state.SunRiseHour,
        fetchData 
        }}>

        {props.children}
    </WeatherContext.Provider>
}

export default WeatherState