import React, { useState } from 'react';
import ModalComponent from './ModalComponent';

const ParentComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>

            <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
                <h2>Modal Content</h2>
                <p>This is the content of the modal.</p>
            </ModalComponent>
        </div>
    );
};

export default ParentComponent;
