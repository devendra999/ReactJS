import React, { useState } from 'react';
import SelectComponent from './SelectComponent';

const ParentComponent = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    return (
        <div>
            <SelectComponent
                options={options}
                value={selectedValue}
                onChange={handleSelectChange}
            />
        </div>
    );
};

export default ParentComponent;
