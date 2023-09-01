import React from 'react'

const Button = (props) => {
    const { children, style, onClick, type } = props;
    return (
        <button style={style ? style : { background: 'red', color: '#fff' }} type={type} onClick={onClick}>{children}</button>
    )
}

export default Button