import { createContext, useState } from 'react';
import { GetData } from '../helpers';

export const AppContext = createContext();

function ContextProvider({ children }) {
  const [WeatherData, setWeatherData] = useState({
    Icon: '',
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
    SunRiseHour: null,
  });

  const FetchData = async (place) => {
    await GetData(place);
    const weatherData = JSON.parse(localStorage.getItem('DataObject'));

    setWeatherData((prev) => ({
      ...prev,
      Icon: weatherData.icon,
      Name: weatherData.name,
      Weather: weatherData.weather,
      Hour: weatherData.hour,
      Temp: weatherData.temp,
      Time: weatherData.time,
      Data: weatherData.data,
      CurrentDetails: weatherData.CurrentDetails,
      Wind: weatherData.wind,
      Country: weatherData.country,
      SunSetHour: weatherData.sunsetTimeNumber,
      SunRiseHour: weatherData.sunriseTimeNumber,
    }));
  };

  return (
    <AppContext.Provider value={{ WeatherData, FetchData }}>
      {children}
    </AppContext.Provider>
  );
}

export default ContextProvider;
