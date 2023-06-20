import React, { useState } from 'react'
import './customModal.scss'

const CustomModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }
  return (
      <div className="custom-modal">
          <div className="custom-modal-content">
              <span className="custom-close" onClick={onClose}>&times;</span>
              {children}
          </div>
      </div>
    //   see AsyncAPI component to modal behavior
  )
}

export default CustomModal