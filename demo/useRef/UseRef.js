import React, {useState, useEffect, useRef} from 'react'

const UseRef = () => {
    const [myData, setMyData] = useState('');
    // const [count, setCount] = useState(0);

    const count = useRef(0);
    console.log(count);

    useEffect(() => {
        // setCount(count+1)
        count.current = count.current + 1;
    })

  return (
    <>
        <div className="section">
            <div className="container">
                <h3>useRef Hook</h3>
                <input type='text' value={myData} onChange={(e)=> setMyData(e.target.value)} />
                <p>The Numbers of times render {count.current}</p>
            </div>
        </div>
    </>
  )
}

export default UseRef