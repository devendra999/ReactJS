import React, { useState } from "react";

export default function App() {

    const [price, setPrice] = useState(40);

    // Triggered when the value gets updated while scrolling the slider:
    const handleInput = (e) => {
        setPrice(e.target.value);
    }
    const hotels = [
        { name: "A", price: 40 },
        { name: "B", price: 50 },
        { name: "C", price: 60 }
    ];

    return (
        <div className="App">
            <input type="range" onInput={handleInput} />
            <h1>Price: {price}</h1>
            <div>
                {hotels.filter(hotel => { return hotel.price > parseInt(price, 10) }).map(hotel => {
                    return <p key={hotel.name}>{hotel.name} | {hotel.price} &euro; </p>
                })}
            </div>
        </div>
    );
}
