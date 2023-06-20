import React from 'react'
import { useCallback, useState } from "react";
import Todos from './Todos';


const UseCallback = () => {
    const [count, setCount] = useState(0);
    const [todos, setTodos] = useState([]);

    const increment = () => {
        setCount(count + 1);
    };

    const addTodo = useCallback(() => {
        setTodos((prev) => [...prev, `new Entry`]);
    }, [todos]);

  return (
    <>
        <div className='section'>
            <div className='container'>
                  <Todos todos={todos} addTodo={addTodo} />
                  <hr />
                  <div>
                      Count: {count}
                      <button onClick={increment}>+</button>
                  </div>
            </div>
        </div>
    </>
  )
}

export default UseCallback