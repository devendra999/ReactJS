import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
    const [dataFromChild, setDataFromChild] = useState('');

    const handleDataFromChild = (data) => {
        setDataFromChild(data);
    };

    return (
        <div>
            <ChildComponent sendDataToParent={handleDataFromChild} />
            <p>Data from child component: {dataFromChild}</p>
        </div>
    );
}

export default ParentComponent;
