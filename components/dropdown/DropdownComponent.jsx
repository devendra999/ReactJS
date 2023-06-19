import React, { useState } from 'react';

const DropdownComponent = ({ options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionSelect = (event) => {
        const option = event.target.value;
        setSelectedOption(option);
        onSelect(option);
    };
    console.log(options)

    return (
        <select value={selectedOption} onChange={handleOptionSelect}>
            <option value="">Select an option</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default DropdownComponent;
