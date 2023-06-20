import React, { useState } from 'react';
import FilterComponent from './FilterComponent';

function ParentComponent() {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [items, setItems] = useState([
        { name: 'Apple', category: 'Fruit' },
        { name: 'Banana', category: 'Fruit' },
        { name: 'Orange', category: 'Fruit' },
        { name: 'Carrot', category: 'Vegetable' },
        { name: 'Broccoli', category: 'Vegetable' }
    ]);

    const handleCheckboxChange = (event) => {
        const option = event.target.value;
        if (event.target.checked) {
            setSelectedOptions([...selectedOptions, option]);
        } else {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        }
    };

    const filteredItems = items.filter((item) =>
        selectedOptions.includes(item.category)
    );

    const availableOptions = Array.from(
        new Set(items.map((item) => item.category))
    );

    return (
        <div>
            <h2>Parent Component</h2>
            <FilterComponent
                options={availableOptions}
                selectedOptions={selectedOptions}
                onChange={handleCheckboxChange}
            />
            <ul>
                {filteredItems.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default ParentComponent;
