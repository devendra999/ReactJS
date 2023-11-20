import {
  GET_USERS_REQUEST,
  GET_USERS_FAILED,
  GET_USERS,
  UPDATE_USER,
  GET_USER,
  ADD_USER,
  REMOVE_USER,
} from "../actions/userTypes";

const initialState = {
  users: [],
  user: null,
  loading: false,
  error: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        user: [],
      };

    case GET_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case GET_USER:
      // console.log(action.payload);
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case GET_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_USER:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        users: [action.payload, ...state.users],
      };

    case UPDATE_USER:
      console.log(action.payload);
      debugger;
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user.id == action.payload.id ? action.payload : user
        ),
      };

    case REMOVE_USER:
      // console.log(action.payload);
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    default:
      return state;
  }
};
