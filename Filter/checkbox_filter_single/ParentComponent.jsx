import React, { useState } from 'react';
import FilterComponent from './FilterComponent';

function ParentComponent() {
    const [isChecked, setIsChecked] = useState(false);
    const [items, setItems] = useState([
        { name: 'Apple', isAvailable: true },
        { name: 'Banana', isAvailable: false },
        { name: 'Orange', isAvailable: true },
        { name: 'Strawberry', isAvailable: false },
        { name: 'Mango', isAvailable: true }
    ]);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const filteredItems = isChecked ? items.filter((item) => item.isAvailable) : items;

    return (
        <div>
            <h2>Parent Component</h2>
            <FilterComponent isChecked={isChecked} onChange={handleCheckboxChange} />
            <ul>
                {filteredItems.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default ParentComponent;
