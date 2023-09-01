import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../redux/actions/userAction";
import UserItem from "../components/UserItem";
import { FaPlus } from "react-icons/fa6";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";




const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    console.log(users)
    useEffect(() => {
        dispatch(getUsers());
    }, []);


    return (
        <>
            <Link to="/addUser">
                <Button className="addUser" variant="contained"><FaPlus /> Add New User</Button>
            </Link>
            <TableContainer component={Paper} style={{ maxWidth: '1300px', margin: 'auto', }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <UserItem key={user.id} user={user} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </>
    )
}

export default Users