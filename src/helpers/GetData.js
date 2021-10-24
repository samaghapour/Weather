import { format } from 'date-fns';
import { GetTimeZone } from './GetTimeZone';
import { SwitchBackground } from './SwitchBackground';

export const GetData = async (place) => {
  // set searched location name in local storage
  localStorage.setItem('location', JSON.stringify(place));

  //loading on
  document.getElementById('loadingBox').style.display = 'block';

  const res = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.REACT_APP_APP_ID}`
  );

  const data = await res.json();
  // loading off
  document.getElementById('loadingBox').style.display = 'none';

  if (data.cod !== '200') {
    // if searched place doesn't found
    alert('no place found!');
  } else {
    //set needed data into object
    let DataObject = new (function () {
      this.icon = data.list[0].weather[0]?.icon;
      this.timezone = GetTimeZone(data.city.timezone);
      this.hour = this.timezone.getHours();
      this.weather = data.list[0].weather[0].main;
      this.temp = (data.list[0].main.temp - 273.15).toFixed(1);
      this.name = data.city.name;
      this.country = data.city.country;
      this.time = format(this.timezone, 'eee PP HH:mm');
      this.sunset = data.city.sunset;
      this.sunrise = data.city.sunrise;
      this.data = data.list;
      // get sunset time
      this.SunsetTime = new Date(
        this.sunset * 1000 +
          new Date().getTimezoneOffset() * 60000 +
          data.city.timezone * 1000
      );
      //get sunrise time
      this.SunriseTime = new Date(
        this.sunrise * 1000 +
          new Date().getTimezoneOffset() * 60000 +
          data.city.timezone * 1000
      );
      // calc percentage of passed time
      this.processWidth = () => {
        const a = this.timezone.getHours() - this.SunriseTime.getHours();
        const b =
          100 / (this.SunsetTime.getHours() - this.SunriseTime.getHours());
        return a * b;
      };
      // just hour of sunset & sunrise time
      this.sunsetTimeNumber = this.SunsetTime.getHours();
      this.sunriseTimeNumber = this.SunriseTime.getHours();

      //current details of weather
      this.CurrentDetails = {
        humidity: data.list[0].main.humidity + '%',
        pressure: data.list[0].main.pressure + ' mBar',
        visibility: data.list[0].visibility / 1000 + ' km',
        sunrise: format(this.SunriseTime, 'HH:mm aa'),
        sunset: format(this.SunsetTime, 'HH:mm aa'),
        processWidth: this.processWidth(),
        time: this.timezone.getHours(),
        sunriseHour: this.SunriseTime.getHours(),
      };
      //wind details of weather
      this.wind = {
        deg: data.list[0].wind.deg,
        speed: Number(data.list[0].wind.speed.toFixed(0)),
        gust: data.list[0].wind.gust,
        lastUpdate: data.list[0].dt_txt.substr(10),
      };
    })();

    // switch background depend on weather and hour
    SwitchBackground(
      DataObject.hour,
      DataObject.sunsetTimeNumber,
      DataObject.sunriseTimeNumber,
      DataObject.weather
    );

    localStorage.setItem('DataObject', JSON.stringify(DataObject));
  }
};
