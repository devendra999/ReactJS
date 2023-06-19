import React from 'react';

const CheckboxComponent = ({ label, checked, onChange }) => {
    return (
        <label>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            {label}
        </label>
    );
};

export default CheckboxComponent;
