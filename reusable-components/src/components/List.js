import React from 'react'

const List = (props) => {
    const { items } = props;
    return (
        <ul className="list-container">
            {items.map((item, index) => (
                <li key={index} className="list-item">
                    {item}
                </li>
            ))}
        </ul>
    )
}

export default List