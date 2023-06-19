import React from 'react';

const RadioComponent = ({ options, selectedOption, onChange }) => {
    return (
        <div>
            {options.map((option) => (
                <label key={option.value}>
                    <input
                        type="radio"
                        name="radioGroup"
                        value={option.value}
                        checked={option.value === selectedOption}
                        onChange={onChange}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
};

export default RadioComponent;
