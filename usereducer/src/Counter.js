import React, { useReducer } from 'react'

const initialState = 0;

const reducer = (state, action) =>   {
    console.log(state, action)
    if(action.type === 'INC') {
        return state + 1;
    } else if (action.type === 'DEC') {
        return state - 1;
    }

    return state;
}

const Counter = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
        <div className='info'>
              <p>The useReducer Hook is similar to the useState Hook.</p>
              <p>The reducer function contains your custom state logic and the initialStatecan be a simple value but generally will contain an object.</p>
              <p>The useReducer Hook returns the current stateand a dispatchmethod.</p>
        </div>
        <button onClick={() => dispatch({type: 'INC'})}>Inc</button>
        <span>{state}</span>
        <button onClick={() => dispatch({type: 'DEC'})}>Dec</button>
    </>
  )
}

export default Counter