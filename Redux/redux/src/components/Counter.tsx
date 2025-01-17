// app/components/Counter.js
'use client';
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  const count = useSelector((state) => state.count.count); // Accessing state from Redux
  const dispatch = useDispatch(); // To dispatch actions

  const increment = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const decrement = () => {
    dispatch({ type: 'DECREMENT' });
  };

  return (
    <div>
      <button onClick={decrement}>-</button>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default Counter;
