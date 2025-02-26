// src/components/UserForm.js

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const editingUser = useSelector((state) => state.users.editingUser);

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUser) {
      // Update existing user
      const updatedUser = { ...editingUser, name, email };
      dispatch({ type: "UPDATE_USER", payload: updatedUser });
    } else {
      // Add new user
      const newUser = { id: Date.now(), name, email };
      dispatch({ type: "ADD_USER", payload: newUser });
    }

    // Clear the form
    setName("");
    setEmail("");
  };

  return (
    <div>
      <h2>{editingUser ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">
          {editingUser ? "Update User" : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
