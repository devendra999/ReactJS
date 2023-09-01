import React from 'react'

const Input = (props) => {
    const { type, name, value, autofocus, min, max, size, placeholder, title } = props;
    return (
        <input title={title} placeholder={placeholder}
            type={type} name={name} value={value} autoFocus={autofocus} min={min} max={max} size={size} />
    )
}

export default Input