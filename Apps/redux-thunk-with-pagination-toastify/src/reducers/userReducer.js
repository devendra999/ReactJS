import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  REMOVE_USER,
  EDIT_USER,
  SET_LOADING,
  SET_ERROR,
} from "../actions/userTypes";

const initialState = {
  users: [],
  user: null,
  loading: false,
  error: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case GET_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case ADD_USER:
      return {
        ...state,
        loading: false,
        users: [action.payload, ...state.users],
      };

    case EDIT_USER:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    case REMOVE_USER:
      // console.log(...state.users);
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    default:
      return state;
  }
};
