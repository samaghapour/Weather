// images
import night from '../images/night.jpg';
import day from '../images/day.jpg';
import cloudyDay from '../images/cloudyDay.jpg';
import cloudyNight from '../images/cloudyNight.jpg';
import rainDay from '../images/rainDay.jpg';
import rainNight from '../images/rainNight.jpg';
import snowingDay from '../images/snowingDay.jpg';
import snowingNight from '../images/snowingNight.jpg';

// switch background depend on hour and weather description
export const SwitchBackground = (hour, sunset, sunrise, weather) => {
  const body = document.body,
    h5 = document.querySelector('h5'),
    search = document.getElementById('search'),
    weatherConditionsBox = document.querySelector('.weatherConditionsBox'),
    weatherTable = document.querySelector('.weatherTable'),
    sideTwo = document.querySelector('.sideTwo'),
    date = document.querySelectorAll('.date'),
    span = document.querySelectorAll('span'),
    h3 = document.querySelectorAll('h3');

  if (
    body &&
    h5 &&
    search &&
    weatherConditionsBox &&
    weatherTable &&
    sideTwo &&
    date &&
    span &&
    h3
  ) {
    // conditions for background
    if ((hour < sunrise || hour >= sunset) && weather === 'Clear') {
      body.style.background = `url(${night}`;
    } else if (hour < sunset && hour >= sunrise && weather === 'Clear') {
      body.style.background = `url(${day}`;
    } else if ((hour < sunrise || hour >= sunset) && weather === 'Clouds') {
      body.style.background = `url(${cloudyNight}`;
    } else if (hour < sunset && hour >= sunrise && weather === 'Clouds') {
      body.style.background = `url(${cloudyDay}`;
    } else if ((hour < sunrise || hour >= sunset) && weather === 'Rain') {
      body.style.background = `url(${rainNight}`;
    } else if (hour < sunset && hour >= sunrise && weather === 'Rain') {
      body.style.background = `url(${rainDay}`;
    } else if ((hour < sunrise || hour >= sunset) && weather === 'Snow') {
      body.style.background = `url(${snowingNight}`;
    } else if (hour < sunset && hour >= sunrise && weather === 'Snow') {
      body.style.background = `url(${snowingDay}`;
    } else {
      body.style.background = '#f4f4f4';
    }

    // conditions for font color
    if (hour < sunrise || hour >= sunset) {
      body.style.color = 'rgb(224, 224, 219)';
      date.forEach((item) => (item.style.color = 'rgb(224, 224, 219)'));
      span.forEach((item) => (item.style.color = 'rgb(224, 224, 219)'));
      h3.forEach(
        (item) => (item.style.borderBottom = '1px solid rgb(224, 224, 219)')
      );

      h5.style.borderBottom = '1px solid rgb(224, 224, 219)';

      search.style.color = 'rgb(224, 224, 219)';

      weatherConditionsBox.style.background = 'rgba(115, 113, 113, 0.15)';
      search.style.background = 'rgba(115, 113, 113, 0.15)';
      search.className = 'darkSearch';
      weatherTable.style.background = 'rgba(115, 113, 113, 0.15)';
      sideTwo.style.background = 'rgba(115, 113, 113, 0.3)';
    } else {
      body.style.color = 'black';
      date.forEach((item) => (item.style.color = 'black'));
      span.forEach((item) => (item.style.color = 'black'));
      h3.forEach((item) => (item.style.borderBottom = '1px solid black'));
      h5.style.borderBottom = '1px solid black';

      search.style.color = 'black';
      search.className = 'lightSearch';
      weatherConditionsBox.style.background = 'rgba(255, 255, 255, 0.15)';
      search.style.background = 'rgba(255, 255, 255, 0.15)';
      weatherTable.style.background = 'rgba(255, 255, 255, 0.15)';
      sideTwo.style.background = 'rgba(240, 240, 240, 0.3)';
    }

    body.style.backgroundPosition = 'center center';
    body.style.backgroundSize = 'cover';
    body.style.backgroundAttachment = 'fixed';
  }
};
