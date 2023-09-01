import axios from "axios";
import {
    GET_USERS,
    GET_USER,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
} from "./userTypes";


// get all posts
export const getUsers = () => async (dispatch) => {
    const result = await axios.get("https://jsonplaceholder.typicode.com/users");
    dispatch({
        type: GET_USERS,
        payload: result.data,
    });
};

// get a post
export const getUser = (id) => async (dispatch) => {

    const result = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
    );

    dispatch({
        type: GET_USER,
        payload: result.data,
    });
};

// create a post
export const createUser = (user) => async (dispatch) => {
    const result = await axios.post(
        "https://jsonplaceholder.typicode.com/users/",
        user
    );

    dispatch({
        type: CREATE_USER,
        payload: result.data,
    });
};

// update a post
export const updateUser = (user) => async (dispatch) => {
    const result = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${user.id}`,
        user
    );
    dispatch({
        type: UPDATE_USER,
        payload: result.data,
    });
};

// delete a post
export const deleteUser = (id) => async (dispatch) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({
        type: DELETE_USER,
        payload: id,
    });
};