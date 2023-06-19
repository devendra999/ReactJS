import React, { useState } from 'react';
import CheckboxComponent from './CheckboxComponent';

const ParentComponent = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return (
        <div>
            <CheckboxComponent
                label="Check me"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
        </div>
    );
};

export default ParentComponent;
