import React, { useState, useContext } from 'react';
import { AppContext } from '../context';

const SearchBox = () => {
  const { FetchData } = useContext(AppContext);

  const [place, setplace] = useState('');

  // fetch data with searched name
  const searchPlace = (e) => {
    e.preventDefault();
    FetchData(place);
    setplace('');
  };

  const changeInputValue = (e) => {
    setplace(e.target.value);
  };

  return (
    <form className='searchBox' onSubmit={searchPlace}>
      <input
        type='search'
        name='search'
        id='search'
        placeholder='Search Places'
        onChange={changeInputValue}
        value={place}
        autoComplete='off'
      />
    </form>
  );
};

export default SearchBox;
