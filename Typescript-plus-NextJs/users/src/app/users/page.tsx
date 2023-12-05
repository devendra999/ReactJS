"use client";
import axios from "axios";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const response = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = response.data;
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const removeUser = (id: number) => {
    let newUser = users.filter((user) => user.id !== id);
    setUsers(newUser);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Navbar />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <div className="button-group">
                  <Link href={`users/user?id=${user.id}`}>
                    <button>view</button>
                  </Link>
                  <Link href={`users/edit-user?id=${user.id}`}>
                    <button>edit</button>
                  </Link>
                  <button onClick={() => removeUser(user.id)}>Delt</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
