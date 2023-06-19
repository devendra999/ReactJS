import React from 'react';

const ModalComponent = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
};

export default ModalComponent;
