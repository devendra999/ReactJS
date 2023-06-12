import React, {useState} from 'react'

const ParentComponent = () => {
    const [myArray, setMyArray] = useState([]);

    const addObjectToArray = (newObject) => {
        setMyArray([...myArray, newObject]);
    };
  return (
    <>
          <div>
              <button onClick={() => addObjectToArray({ id: 1, name: 'New Object' })}>
                  Push Object
              </button>
              {/* Display the array */}
              {myArray.map((object, index) => (
                  <div key={index}>{object.name}</div>
              ))}
          </div>
    </>
  )
}

export default ParentComponent