import React from 'react';

function ChildComponent({ sendDataToParent }) {
    const sendData = () => {
        const data = 'Hello, Parent!';
        sendDataToParent(data); // Call the function passed from the parent with the data
    };

    return (
        <div>
            <button onClick={sendData}>Send Data to Parent</button>
        </div>
    );
}

export default ChildComponent;
