import React, { useState } from 'react';

const InputComponent = () => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
        />
    );
};

export default InputComponent;
