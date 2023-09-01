import React from 'react'

const Title = (props) => {
    const { text, style } = props;
    return (
        <h2 style={style}>{text}</h2>
    )
}

export default Title