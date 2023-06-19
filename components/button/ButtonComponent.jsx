import React from 'react';

const ButtonComponent = ({ text, onClick }) => {
    return (
        <button onClick={onClick}>{text}</button>
    );
};

export default ButtonComponent;
