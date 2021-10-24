import React, { useContext } from 'react';
import { format, parseISO } from 'date-fns';
import { AppContext } from '../context';

const WeatherTable = () => {
  const { WeatherData } = useContext(AppContext);

  const tableData = [];

  // loop through data (6 days weather data) and set its necessary data into tabledata array
  WeatherData &&
    WeatherData.Data &&
    WeatherData.Data.forEach((item) => {
      const TableTemp = (item?.main.temp - 273.15).toFixed(1);
      const TableTime = item?.dt_txt;
      const TableIcon = item?.weather[0]?.icon;
      const TableDescription = item?.weather[0]?.description;

      tableData.push({
        date: format(parseISO(TableTime), ' E d MMM HH:mm'),
        temp: +TableTemp,
        icon: `http://openweathermap.org/img/wn/${TableIcon}@2x.png`,
        description: TableDescription,
        key: Math.random() * 100,
      });
    });

  return (
    <div className='table'>
      <table className='weatherTable'>
        <thead>
          <tr className='heads'>
            <th>Date</th>
            <th>Temp</th>
          </tr>
        </thead>
        <thead>
          {tableData.map((item) => {
            return (
              <tr key={item.key}>
                <th className='date'>
                  {item.date} <span>{item.description}</span>
                </th>
                <th className='temp'>
                  {' '}
                  <img
                    src={item.icon}
                    alt='icon'
                    style={{ width: '50px', height: '50px' }}
                  />{' '}
                  {item.temp}
                </th>
              </tr>
            );
          })}
        </thead>
      </table>
    </div>
  );
};

export default WeatherTable;
