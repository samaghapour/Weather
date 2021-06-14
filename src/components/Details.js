import React,{useContext} from 'react'
import WeatherContext from '../context/weatherContext';

import moon from '../weatherIcons/moon.png'
import sun from '../weatherIcons/sun.png'

 const Details = () => {
    const weatherContext = useContext(WeatherContext)
    const {CurrentDetails,Wind} = weatherContext;

     const {deg,gust,speed,lastUpdate} = Wind
     const {pressure,visibility,humidity,sunrise,sunset,processWidth,time,sunriseHour} = CurrentDetails
    
    return (
        <div className="detailsBox">
            <h3><i className='fas fa-question'></i> Current Details </h3> <h5>Last Update: {lastUpdate}</h5>
            <h4>humidity:</h4> <span>{humidity}</span> <br />
            <h4>pressure:</h4> <span>{pressure}</span> <br />
            <h4>visibility:</h4> <span>{visibility}</span>

            <h3><i className='fas fa-wind'></i> Wind</h3>
            <h4>speed:</h4> <span>{speed} km/H</span> <br />
            <h4>Degree:</h4> <span> {deg}° </span> <br /> 
            <h4>gust:</h4> <span>{gust} km/H</span> <br /> 

            <h3>Sunrise & Sunset</h3>
                    <div className="timeBox">
                        <div className="sunriseBox">
                        <strong >Sunrise</strong>
                        <h4>{sunrise}</h4>
                        </div>
                        <div className="sunsetBox">
                        <strong>Sunset</strong>
                        <h4>{sunset}</h4>
                        </div>
                    </div>

                <div className='sunBox'>
                 <div className='sunProcess' 
                 style={{width: +time > sunriseHour ? processWidth > 100 ? '100%': processWidth + '%' :'2%' ,
                  background: processWidth < 60 ? 'linear-gradient(to bottom ,#63AAB0,#488A90,#356469,#213F41)' : processWidth < 80 ? 'linear-gradient(to bottom ,#4F69D5,#2842A7,#1C2E75,#101A43)' : 'linear-gradient(to bottom ,#432DA5,#302075,#18103B,#0A0617)'}} >

                            <img alt='weatherIcon' className='processIcon' src={processWidth > 80 ? moon : sun}></img>
                    </div>
                    
                </div>
          
        </div>
    )
}

export default Details