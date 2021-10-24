import React, { useContext } from 'react';
import { AppContext } from '../context';

import moon from '../weatherIcons/moon.png';
import sun from '../weatherIcons/sun.png';

const Details = () => {
  const { WeatherData } = useContext(AppContext);
  const { CurrentDetails, Wind } = WeatherData;

  const { deg, gust, speed, lastUpdate } = Wind;

  const {
    pressure,
    visibility,
    humidity,
    sunrise,
    sunset,
    processWidth,
    time,
    sunriseHour,
  } = CurrentDetails;

  return (
    <div className='detailsBox'>
      <h3>Current Details </h3> <h5>Last Update: {lastUpdate && lastUpdate}</h5>
      <h4>humidity:</h4> <span>{humidity && humidity}</span> <br />
      <h4>pressure:</h4> <span>{pressure && pressure}</span> <br />
      <h4>visibility:</h4> <span>{visibility && visibility}</span>
      <h3>Wind</h3>
      <h4>speed:</h4> <span>{speed && speed} km/H</span> <br />
      <h4>Degree:</h4> <span> {deg && deg}° </span> <br />
      <h4>gust:</h4> <span>{gust && gust} km/H</span> <br />
      <h3>Sunrise & Sunset</h3>
      <div className='timeBox'>
        <div className='sunriseBox'>
          <strong>Sunrise</strong>
          <h4>{sunrise && sunrise}</h4>
        </div>
        <div className='sunsetBox'>
          <strong>Sunset</strong>
          <h4>{sunset && sunset}</h4>
        </div>
      </div>
      <div className='sunBox'>
        <div
          className='sunProcess'
          style={{
            width:
              time && sunriseHour && processWidth && +time > sunriseHour
                ? processWidth > 100
                  ? '100%'
                  : processWidth + '%'
                : '2%',
            background:
              processWidth && processWidth < 60
                ? 'linear-gradient(to bottom ,#63AAB0,#488A90,#356469,#213F41)'
                : processWidth && processWidth < 80
                ? 'linear-gradient(#113076,#135899);'
                : 'linear-gradient(to bottom ,#471B87,#463B87,#6A4190)',
          }}>
          <img
            alt='weatherIcon'
            className='processIcon'
            src={processWidth && processWidth > 80 ? moon : sun}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
