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

        // The useReducer(reducer, initialState) hook accepts 2 arguments: the reducer function and the initial state. The hook then returns an array of 2 items: the current state and the dispatch function.
        
        // The reducer is a pure function that accepts 2 parameters: the current state and an action object. Depending on the action object, the reducer function must update the state in an immutable manner, and return the new state.
        
        // function reducer(state, action) {
        //   let newState;
        //   switch (action.type) {
        //     case 'increase':
        //       newState = { counter: state.counter + 1 };
        //       break;
        //     case 'decrease':
        //       newState = { counter: state.counter - 1 };
        //       break;
        //     default:
        //       throw new Error();
        //   }
        //   return newState;
        // }

    </>
  )
}

export default Counter
