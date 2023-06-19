import React from 'react';
import ButtonComponent from './ButtonComponent';


const ParentComponent = () => {
    const handleClick = () => {
        // handle button click event
    };

    return (
        <div>
            <ButtonComponent text="Click me" onClick={handleClick} />
        </div>
    );
};

export default ParentComponent;
