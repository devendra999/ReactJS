import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '../slices/themeSlice'

// WIP
const ThemeToggle = () => {
  const dispatch = useDispatch()

  return (
    <div className='theme-toggle'>
      <input
        type='checkbox'
        id='switch'
        onChange={() => dispatch(toggleTheme())}
      />
      <label htmlFor='switch'>
        <div className='toggle'></div>
        <div className='names'>
          <p className='light'>Light</p>
          <p className='dark'>Dark</p>
        </div>
      </label>
    </div>
  )
}

export default ThemeToggle
