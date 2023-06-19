import React, { useState } from 'react';
import RadioComponent from './RadioComponent';

const ParentComponent = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    return (
        <div>
            <RadioComponent
                options={options}
                selectedOption={selectedOption}
                onChange={handleRadioChange}
            />
        </div>
    );
};

export default ParentComponent;
