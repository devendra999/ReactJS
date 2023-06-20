// useLayoutEffect, runs synchronously after a render but before the screen is updated.

// useEffect runs asynchronously and after a render is painted to the screen.

import React, { useState, useLayoutEffect, useEffect } from "react";

const LayoutEffect = () => {
    const [num, setNum] = useState(0);

    useEffect(() => {
      console.log('First useEffect');
    }, []);

    useEffect(() => {
        console.log('Second useEffect');
    }, []);

    useEffect(() => {
        console.log('Third useEffect');
    }, []);
    
    useLayoutEffect(() => {
        console.log('Fourth useEffect');
    }, []);
    

    return (
        <>
            <h5>useLayoutEffect is a version of useEffect that fires before the browser repaints the screen.</h5>
            <h5>useEffect hooks run top to bottom heracky</h5>
            <h5>useLayout#ffect hooks run top to bottom heracky</h5>
            <h2>{num}</h2>
            <button onClick={() => setNum(0)}>check</button>
        </>
    );
};

export default LayoutEffect;