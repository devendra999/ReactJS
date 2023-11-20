import axios from "axios";
import {
  GET_USERS_FAILED,
  GET_USERS,
  ADD_USER,
  GET_USERS_REQUEST,
  REMOVE_USER,
  UPDATE_USER,
  GET_USER,
} from "./userTypes";

// get all posts
export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS_REQUEST });
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({ type: GET_USERS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_USERS_FAILED, payload: error.message });
  }
};

// get user
export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS_REQUEST });
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    // console.log(data);
    dispatch({ type: GET_USER, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_USERS_FAILED, payload: error.message });
  }
};

// add user
export const addUser = (hello) => async (dispatch) => {
  console.log(hello);
  try {
    dispatch({ type: GET_USERS_REQUEST });
    const result = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      hello
    );
    dispatch({ type: ADD_USER, payload: result.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_USERS_FAILED, payload: error.message });
  }
};

// edit user
export const editUser = (user) => async (dispatch) => {
  console.log(user);
  try {
    dispatch({ type: GET_USERS_REQUEST });
    const result = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${user.id}`,
      user
    );
    // console.log(result.data);
    dispatch({ type: UPDATE_USER, payload: result.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_USERS_FAILED, payload: error.message });
  }
};

// remove user
export const removeUser = (id) => async (dispatch) => {
  console.log(id);
  try {
    dispatch({ type: GET_USERS_REQUEST });
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({ type: REMOVE_USER, payload: id });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_USERS_FAILED, payload: error.message });
  }
};
