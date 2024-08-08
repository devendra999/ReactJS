"use client";

const initialState = {
  users: [],
  filterUsers: [],
  singleUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // Define your action types and corresponding state changes here

    // For example:
    case "GET_ALL_USERS":
      return {
        ...state,
        users: action.payload,
        filterUsers: action.payload
      };

    case "GET_SINGLE_USERS":
      return {
        ...state,
        singleUser: action.payload,
      };
    
    case "NULL_SINGLE_USERS":
      return {
        ...state,
        singleUser: [],
      };

    case "CREATE_USER":
      return {
        ...state,
        users: [action.payload, ...state.users],
      };

    case "REMOVE_USER":
      let removedUser = state.filterUsers.filter((e) => e.id !== action.payload);
      return {
        ...state,
        filterUsers: removedUser,
      };

    case "SEARCH_USER":
      const {users} = state;
      let searchUser = [...users]; 
      let searchText = action.payload;
      let sdsd = searchUser.filter((user) =>
        user.name.toLowerCase().includes(searchText) || user.email.toLowerCase().includes(searchText)
      );

      return {
        ...state,
        filterUsers: sdsd,
      };

    default:
      return state;
  }
};

export default userReducer;
