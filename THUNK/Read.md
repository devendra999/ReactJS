1. Create store.js file
   
        import { createStore, combineReducers, applyMiddleware } from "redux";
        import thunk from "redux-thunk"; // call thunk
        import { composeWithDevTools } from "redux-devtools-extension"; // redux devtools extention call
        import { userReducer } from "./redux/reducers/userReducer"; // import reducer file

        const rootReducer = combineReducers({
          userList: userReducer, // this is reducer call here
        });

        const intialState = {}; // initial value

        const middleware = [thunk]; // apply middlewere here

        const store = createStore(
          rootReducer,
          intialState,
          composeWithDevTools(applyMiddleware(...middleware))
        );

        export default store; // export store


2. Provide store in index.js file

   
        import { Provider } from "react-redux";
        import store from "./store";

        <Provider store={store}>
          <App />
        </Provider>,



3. Create Constant file


        export const GET_USERS_REQUEST = "GET_USERS_REQUEST";
        export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
        export const GET_USERS_FAIL = "GET_USERS_FAIL ";




4. Create Reducer file
   
        import {
        GET_USERS_REQUEST,
        GET_USERS_SUCCESS,
        GET_USERS_FAIL,
        } from "../constansts/userConstants";

        export const userReducer = (state = { users: [] }, action) => {
            switch (action.type) {
              case GET_USERS_REQUEST:
                return { loading: true, users: [] };
              
              case GET_USERS_SUCCESS:
                return { loading: false, users: action.payload };
              
              case GET_USERS_FAIL:
                return { loading: false, error: action.payload };
              
              default: return state;
            }
        };



5. Reducer file call in store.js file
   
        1. import { userReducer } from "./redux/reducers/userReducer"; // import reducer file

        2. In rootreducer call reducer Variable
          const rootReducer = combineReducers({
            userList: userReducer, // this is reducer call here
          });

6. Create Action file
    
    1. import Constant file

    2. Code like this
  
       import axios from "axios";
        import {
        GET_USERS_REQUEST,
        GET_USERS_SUCCESS,
        GET_USERS_FAIL,
        } from "../constansts/userConstants";
        
        export const userAction = () => async (dispatch) => {
            try {
                dispatch({ type: GET_USERS_REQUEST });
                const { data } = await axios.get(
                "https://jsonplaceholder.typicode.com/users"
            );
            dispatch({ type: GET_USERS_SUCCESS, payload: data });
            } catch (error) {
                dispatch({
                    type: GET_USERS_FAIL,
                    payload:
                    error.data && error.response.data.message
                    ? error.response.data.message
                    : error.message,
               });
            }
        };


7. When you use this File Edit
    
        import React, { useState, useEffect } from "react";
        import { useDispatch, useSelector } from "react-redux";
        import User from "./components/User";
        
        import { userAction } from "./redux/actions/userAction";
        
        function App() {
            const dispatch = useDispatch();
            const userList = useSelector((state) => state.userList);
            const { loading, users, error } = userList;

            useEffect(() => {
                dispatch(userAction());
            }, [dispatch]);

            return (
                <div className="App">
                  <h1>Redux Thunk Tutorial</h1>
                  {loading ? (
                  <h2>Loading ....</h2>
                  ) : error ? (
                  <h2>{error}</h2>
                  ) : (
                  <User users={users} />
                  )}
                </div>
            );
        }
        
        export default App;
