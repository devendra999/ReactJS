import React, { useState } from 'react'

const SearchStudent = ({ searchData }) => {
    const [search, setSearch] = useState('');
    const handleChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        searchData(value);
    };

  return (
    <>
        <input type="text" value={search} name='search' onChange={handleChange} />
    </>
  )
}

export default SearchStudent