import React, { useContext } from 'react';
import { AppContext } from '../context';

const Condition = () => {
  const { WeatherData } = useContext(AppContext);

  const { Name, Weather, Temp, Time, Country, Icon } = WeatherData;

  return (
    <div className='weatherConditionsBox'>
      <div className='conditionBox'>
        <p className='time'>{Time && Time} </p>
        <h2 className='name'>{Name && Name} </h2>
        <sup>Country: {Country && Country}</sup>
        <h1 className='temp'>
          {' '}
          {Temp && Temp} <sup>°</sup>C
        </h1>
      </div>
      <div className='iconBox'>
        <img
          alt='weatherIcon'
          src={`http://openweathermap.org/img/wn/${Icon}@2x.png`}
          className='icon'></img>
        <h4 className='description'>{Weather && Weather}</h4>
      </div>
    </div>
  );
};

export default Condition;
