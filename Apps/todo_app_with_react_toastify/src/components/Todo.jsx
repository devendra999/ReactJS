import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TodoModal from './TodoModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getLocalItems = () => {
    let list = localStorage.getItem('todo');
    if (list) {
        return JSON.parse(localStorage.getItem('todo'));
    } else {
        return [];
    }

}


const Todo = () => {
    const [items, setItems] = useState(getLocalItems());
    const [editItems, setEditItems] = useState(false);
    const [editItemID, setEditItemID] = useState('');
    const [inputText, setInputText] = useState('');

    // modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addItem = () => {
        if (!inputText) {
            handleOpen();
        } else if (editItems && inputText) {
            setItems(
                items.map((item) => {
                    if (item.id === editItemID) {
                        return { ...item, text: inputText }
                    }
                    return item;
                })
            )
            toast.info('Item updated successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
            setEditItemID('')
            setEditItems(false);
        } else {
            const singleItem = {
                id: new Date().getTime(),
                text: inputText
            }
            setItems([...items, singleItem])
            toast.success('Item added successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        }
        setInputText('');
    }

    const deletItem = (id) => {
        let updatedItem = items.filter((item) => {
            return item.id !== id
        })
        setItems(updatedItem)
        toast.error('Item removed successfully', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    }

    const editItem = (id) => {
        let editValue = items.find((item) => item.id === id)
        setInputText(editValue.text);
        setEditItemID(editValue.id)
        setEditItems(true);
    }

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(items));
    }, [items]);
    console.log(items)

    return (
        <>
            <Box className='todo container'>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>

                            <TextField
                                fullWidth
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                type='text'
                                id="outlined-basic"
                                label={editItems ? 'Update Item' : 'Add Item'}
                                variant="outlined" />

                        </Grid>
                        <Grid item xs={2}>

                            <Button style={{ height: '56px' }} onClick={addItem} variant="contained">
                                {
                                    editItems ? <EditOutlinedIcon /> : <AddOutlinedIcon />
                                }
                            </Button>

                        </Grid>

                        <Grid className='all-list' item xs={12}>
                            {
                                items && items.length > 0 &&
                                items.map((item, index) => {
                                    const { id, text } = item;
                                    return <Box key={id} className='single-item'>
                                        <b style={{ fontSize: '20px' }}>{text}</b>
                                        <Button onClick={() => deletItem(id)} className='delteItem'>
                                            <DeleteOutlineOutlinedIcon style={{ color: 'red' }} />
                                        </Button>
                                        <Button onClick={() => editItem(id)} className='editItem'>
                                            <EditOutlinedIcon style={{ color: 'red' }} />
                                        </Button>
                                    </Box>
                                })
                            }
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <TodoModal open={open} handleOpen={handleOpen} handleClose={handleClose} title="Please add Item" text="You have to fill Item" />
            <ToastContainer />
        </>

    )
}

export default Todo