// src/components/UserList.js

import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UserList = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_USER", payload: id });
  };

  const handleEdit = (user) => {
    dispatch({ type: "SET_EDITING_USER", payload: user });
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users &&
          users.map((user) => (
            <li key={user?.id}>
              {user?.name} - {user?.email}
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserList;
