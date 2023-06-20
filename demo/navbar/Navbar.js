import React from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
        <div className="nav-section">
            <div className="container">
                  <ul className='mainmenu'>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/about">About</Link></li>
                      <li><Link to="/components">Components</Link></li>
                      <li><Link to="/code">Code</Link></li>
                      <li><Link to="/*">Error</Link></li>
                  </ul>
            </div>
        </div>
    </>
  )
}

export default Navbar