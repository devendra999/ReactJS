import React from 'react'

const SelectElement = (props) => {
    const { id, options, } = props;
    console.log(options)
    return (
        <select id={id} className="select-field">
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}

export default SelectElement