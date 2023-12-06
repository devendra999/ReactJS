// Home.tsx
"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import axios from "axios";
import Link from "next/link";

interface UsersProps {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<UsersProps[]>([]);

  const getUsers = async () => {
    try {
      const res = await axios.get<UsersProps[]>("http://localhost:3004/users");
      const data = res.data;
      setUsers(data);
    } catch (error) {
      console.error(`Error fatch user: ${error}`);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3004/users/${id}`);
      getUsers();
    } catch (error) {
      console.error(`Error deleting user: ${error}`);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Box className="container">
        <h2>Hello</h2>
        <Link href="/add-user">
          <Button variant="outlined">Add User</Button>
        </Link>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>email</TableCell>
                <TableCell>phone</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Link href={`/edit-user?edit=${user.id}`}>
                      <Button variant="outlined">Edit</Button>
                    </Link>
                    <Link href={`/user?user=${user.id}`}>
                      <Button variant="outlined">view</Button>
                    </Link>
                    <Button
                      onClick={() => deleteUser(user.id)}
                      variant="outlined"
                    >
                      Trash
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Home;
