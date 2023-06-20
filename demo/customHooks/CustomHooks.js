import React, {useState, useEffect} from 'react'
import useCustomhooksfortitle from './useCustomhooksfortitle';

const CustomHooks = () => {
    const [count, setCount] = useState(0);

    useCustomhooksfortitle(count);
    

    console.log('Hello Outside');
  return (
    <div className="section">
        <div className="container">
            <h4>useCustom Hooks</h4>
            <h1>{count}</h1>
            <button className='btn' onClick={() => setCount(count + 1)}>
                Click here
            </button>
        </div>
    </div>
  )
}

export default CustomHooks