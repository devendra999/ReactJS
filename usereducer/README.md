# Explanation of useReducer Hook
The useReducer(reducer, initialState) hook accepts 2 arguments: the reducer function and the initial state. The hook then returns an array of 2 items: the current state and the dispatch function.

# Reducer Function
The reducer is a pure function that accepts 2 parameters: the current state and an action object. Depending on the action object, the reducer function must update the state in an immutable manner, and return the new state.
### REducer function
```json
function reducer(state, action) {
  let newState;
  switch (action.type) {
    case 'increase':
      newState = { counter: state.counter + 1 };
      break;
    case 'decrease':
      newState = { counter: state.counter - 1 };
      break;
    default:
      throw new Error();
  }
  return newState;
}
```
