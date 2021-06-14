import {SEARCH_DATA} from './types';

const WeatherReducer =(state,action) =>{

    switch(action.type){
        case SEARCH_DATA : return{
            ...state,
            Name: action.peyload.name,
            Weather: action.peyload.weather,
            Hour: action.peyload.hour,
            Temp: action.peyload.temp,
            Time: action.peyload.time,
            Data: action.peyload.data,
            CurrentDetails: action.peyload.CurrentDetails,
            Wind : action.peyload.wind,
            Country: action.peyload.country,
            SunSetHour: action.peyload.sunsetTimeNumber ,
            SunRiseHour: action.peyload.sunriseTimeNumber
        }

        default : return (state)
        
    }
}

export default WeatherReducer
