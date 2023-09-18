import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Button } from '@mui/material'
import React from 'react'



const TodoItem = ({ item }) => {
    const { id, text } = item;

    const deletItem = (id) => {

    }



    return (
        <Box className='single-item'>
            <Button onClick={() => deletItem(id)}>
                <DeleteOutlineOutlinedIcon style={{ color: 'red' }} />
            </Button>
            <b style={{ fontSize: '20px' }}>{text}</b>
        </Box>
    )
}

export default TodoItem