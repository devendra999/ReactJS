// src/redux/userReducer.js

const initialState = {
  users: [
    { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com" },
    { id: 2, name: "Bob Smith", email: "bob.smith@example.com" },
    { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com" },
    { id: 4, name: "Diana Green", email: "diana.green@example.com" },
    { id: 5, name: "Edward Harris", email: "edward.harris@example.com" },
    { id: 6, name: "Fiona Clark", email: "fiona.clark@example.com" },
    { id: 7, name: "George King", email: "george.king@example.com" },
    { id: 8, name: "Hannah Scott", email: "hannah.scott@example.com" },
    { id: 9, name: "Ivy Adams", email: "ivy.adams@example.com" },
    { id: 10, name: "Jack Lee", email: "jack.lee@example.com" },
  ],
  editingUser: null, // New state to track the user being edited
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };

    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        editingUser: null, // Reset editing user after update
      };

    case "SET_EDITING_USER":
      return {
        ...state,
        editingUser: action.payload, // Set the user being edited
      };

    default:
      return state;
  }
};

export default userReducer;
