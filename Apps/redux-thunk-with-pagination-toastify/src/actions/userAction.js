import axios from "axios";
import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  REMOVE_USER,
  EDIT_USER,
  SET_LOADING,
  SET_ERROR,
} from "./userTypes";

// get all USERS
export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const result = await axios.get("http://localhost:3004/users");
    // console.log(result);
    dispatch({ type: GET_USERS, payload: result.data });
  } catch (error) {
    // console.log(error.message);
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

// get single USER
export const getUser = (user) => async (dispatch) => {
  // console.log(user);
  try {
    dispatch({ type: SET_LOADING });
    const result = await axios.get(`http://localhost:3004/users/${user}`);
    // console.log(result);
    dispatch({ type: GET_USER, payload: result.data });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

// remove user
export const removeUser = (user) => async (dispatch) => {
  // console.log(user);
  try {
    dispatch({ type: SET_LOADING });
    const result = await axios.delete(`http://localhost:3004/users/${user}`);
    // console.log(result);
    dispatch({ type: REMOVE_USER, payload: result.data });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

// add  USER
export const addUser = (user) => async (dispatch) => {
  // console.log(user);
  try {
    dispatch({ type: SET_LOADING });
    const result = await axios.post(`http://localhost:3004/users/`, user);
    // console.log(result);
    dispatch({ type: ADD_USER, payload: result.data });
  } catch (error) {
    // console.log(error.message);
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

// edit  USER
export const editUser = (user) => async (dispatch) => {
  // console.log(user);
  try {
    dispatch({ type: SET_LOADING });
    const result = await axios.put(
      `http://localhost:3004/users/${user.id}`,
      user
    );
    // console.log(result);
    dispatch({ type: EDIT_USER, payload: result.data });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};
