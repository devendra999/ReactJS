import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { getUser } from '../redux/actions/userAction';

const User = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);
    const { id } = useParams();
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = () => {
        dispatch(getUser(id));
    };

    if (!user) {
        return <h1>loading..</h1>;
    }



    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">

                    <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {user.name}
                            </TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">{user.phone}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default User