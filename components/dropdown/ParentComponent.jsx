import React from 'react';
import DropdownComponent from './DropdownComponent';

const ParentComponent = () => {
    const handleOptionSelect = (option) => {
        // Handle the selected option
        console.log(option);
    };

    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];
    console.log(options)

    return (
        <div>
            <DropdownComponent options={options} onSelect={handleOptionSelect} />
        </div>
    );
};

export default ParentComponent;
