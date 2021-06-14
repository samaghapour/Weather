import { Fragment } from 'react';
import './App.css';
// components
import SearchBox from './components/SearchBox'
import Condition from './components/Condition'
import Sidebar from './components/Sidebar'
import WeatherTable from './components/WeatherTable'
import WeatherState from './context/WeatherState'



function App() { 

  return (
    <WeatherState >

      <Fragment>
          <div className="sideOne">
            <SearchBox  />
            <Condition />
            <WeatherTable />
          </div>

          <div className="sideTwo">
            <Sidebar />
          </div>
      </Fragment>

    </WeatherState>
  );
}

export default App;
