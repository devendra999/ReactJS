import React from 'react'

const SearchPost = (props) => {
  return (
    <>
        <input
            className='form-control my-5'
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
        />
    </>
  )
}

export default SearchPost