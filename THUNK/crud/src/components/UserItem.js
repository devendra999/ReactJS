import React from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { deleteUser } from "../redux/actions/userAction";

import { FaRegEye, FaPen, FaRegTrashCan, } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


const UserItem = ({ user }) => {
    const { id, name, email, phone } = user;
    const dispatch = useDispatch();

    return (
        <>
            <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {name}
                </TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{phone}</TableCell>
                <TableCell style={{ minWidth: '100px' }}>
                    <Link to={`/user/${id}`}>
                        <FaRegEye style={{ fontSize: '18px', color: '#005ca3' }} />
                    </Link>
                    <Link to={`/updateUser/${id}`}>
                        <FaPen style={{ fontSize: '18px', color: '#37a300', marginLeft: '10px' }} />
                    </Link>
                    <FaRegTrashCan
                        onClick={() => dispatch(deleteUser(id))}
                        style={{ fontSize: '18px', color: '#f00', marginLeft: '10px', cursor: 'pointer' }} />
                </TableCell>
            </TableRow>
        </>
    )
}

export default UserItem