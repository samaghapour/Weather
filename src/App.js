import { useEffect, useContext } from 'react';
import { AppContext } from './context';
import './styles/App.css';
// components
import SearchBox from './components/SearchBox';
import Condition from './components/Condition';
import Sidebar from './components/Sidebar';
import WeatherTable from './components/WeatherTable';

function App() {
  const { FetchData } = useContext(AppContext);
  //fetch data fram local storage
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('location')) === null) {
      FetchData('london');
    } else {
      const loc = JSON.parse(localStorage.getItem('location'));
      FetchData(loc);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className='sideOne'>
        <SearchBox />
        <Condition />
        <WeatherTable />
      </div>

      <div className='sideTwo'>
        <Sidebar />
      </div>
    </>
  );
}

export default App;
