import React from 'react'
import './tooltip.scss'

const Tooltip = ({text, children}) => {
  return (
    <div className="custom-tooltip">
        {children}
        <span className="custom-tooltip-text">{text}</span>
    </div>
  )
}

export default Tooltip