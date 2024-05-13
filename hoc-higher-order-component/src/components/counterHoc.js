import React from 'react'
import { useState } from 'react';

const Counter = () => {
    const [count, setcount] = useState(0)
  return (
    <>
    <button style={{ padding: '12px', border: '1px solid #000' }} onClick={() => setcount(count - 1)}>-</button>
    <button style={{ padding: '12px', border: '1px solid #000' }}>{count}</button>
    <button style={{ padding: '12px', border: '1px solid #000' }} onClick={() => setcount(count + 1)}>+</button>
    </>
  )
}


export {Counter};



const CounterHoc = (Component, color) => {
  return () => {
    return (
      <div style={{ background: color, padding: '30px', display: 'inline-block' }}>
        <h4>{color}</h4>
        <Component />
      </div>
    );
  };
};


const CounterRed = CounterHoc(Counter, 'red');
const CounterGreen = CounterHoc(Counter, 'green');

export {CounterRed, CounterGreen};