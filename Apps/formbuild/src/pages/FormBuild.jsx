import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddFieldModal from '../components/AddFieldModal';
import EditFieldModal from '../components/EditFieldModal';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined';
import { useFieldContext } from '../context/fieldContext';

const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const FormBuild = () => {
    const { fields, removeField } = useFieldContext();

    const [editField, setEditField] = useState(null);

    // add modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // edit modal
    const [editOpen, setEditOpen] = React.useState(false);
    const handleEditOpen = (id) => {
        setEditOpen(true)
        let field = fields.filter((field) => {
            return field?.id == id
        })
        setEditField(field);
    };
    const handleEditClose = () => setEditOpen(false);


    return (
        <Grid container spacing={2} style={{ maxWidth: '1200px', margin: 'auto' }} >
            <AddFieldModal handleOpen={handleOpen} handleClose={handleClose} open={open} />

            {editOpen && <EditFieldModal editField={editField} handleEditOpen={handleEditOpen} handleEditClose={handleEditClose} editOpen={editOpen} />}

            <Grid className='user_config_left' item xs={`${fields.length > 0 ? 8 : 12}`}>
                <Item className='transparent' style={{ padding: 0 }}>
                    <Typography className='formTitle' variant="h6" gutterBottom>
                        Build your form
                    </Typography>
                    <Box className='allField'>
                        {
                            fields && fields.length > 0 &&
                            fields.map((field) => {
                                return <Grid container spacing={2}>
                                    <Grid className='fieldItem fieldType' item xs={2}>
                                        {field?.types}
                                    </Grid>
                                    <Grid className='fieldItem fieldLable' item xs={8}>
                                        <Box>{field?.label}</Box>
                                        {field?.radioItem && field?.radioItem.length > 0 &&
                                            <Grid className='fieldOptionList' container spacing={2}>
                                                {
                                                    field?.radioItem.map((radio, index) => {
                                                        return <Grid key={index} className='fieldOption' item xs={6}>
                                                            <AdjustOutlinedIcon style={{ fontSize: '14px' }} /> {radio?.value}
                                                        </Grid>
                                                    })
                                                }
                                            </Grid>
                                        }

                                        {field?.checkboxItem && field?.checkboxItem.length > 0 &&
                                            <Grid className='fieldOptionList' container spacing={2}>
                                                {
                                                    field?.checkboxItem.map((checkbox, index) => {
                                                        return <Grid key={index} className='fieldOption' item xs={6}>
                                                            <CropSquareOutlinedIcon style={{ fontSize: '14px' }} /> {checkbox?.value}
                                                        </Grid>
                                                    })
                                                }
                                            </Grid>
                                        }
                                    </Grid>
                                    <Grid className='fieldButton' item xs={2}>
                                        <Button onClick={() => handleEditOpen(field?.id)} style={{ minWidth: 'auto', padding: 0 }}>
                                            <EditOutlinedIcon />
                                        </Button>
                                        <Button onClick={() => removeField(field?.id)} style={{ minWidth: 'auto', padding: 0 }}>
                                            <DeleteOutlineIcon style={{ color: '#d21919' }} />
                                        </Button>
                                    </Grid>
                                </Grid>
                            })
                        }
                    </Box>
                    <Button id='add_Field' onClick={handleOpen} fullWidth variant="outlined"><AddOutlinedIcon /> <span>Add Field</span></Button>

                    <Button id='save_Field' fullWidth variant="outlined">Save Field</Button>
                </Item>
            </Grid>

            {
                fields && fields.length > 0 &&
                <Grid className='form-show' item xs={4}>
                    <Item style={{ padding: 0 }}>
                        <Typography className='formTitle' variant="h6" gutterBottom>
                            Form Preview
                        </Typography>
                        {/* <form action=""> */}

                        <Box className='form-preview'>
                            {
                                fields && fields.length > 0 &&
                                fields.map((field) => {
                                    if (field?.types === 'text') {
                                        return <div className='form-group'>
                                            <label htmlFor="">{field?.label} <span>{field?.isRequired && '*'}</span></label>
                                            <input type={field?.types} min={field?.minLength} max={field?.maxLength} required={field?.isRequired} />
                                        </div>
                                    }

                                    if (field?.types === 'number') {
                                        return <div className='form-group'>
                                            <label htmlFor="">{field?.label} <span>{field?.isRequired && '*'}</span></label>
                                            <input type={field?.types} min={field?.minLength} max={field?.maxLength} required={field?.isRequired} />
                                        </div>
                                    }

                                    if (field?.types === 'email') {
                                        return <div className='form-group'>
                                            <label htmlFor="">{field?.label} <span>{field?.isRequired && '*'}</span></label>
                                            <input type={field?.types} required={field?.isRequired} />
                                        </div>
                                    }

                                    if (field?.types === 'radio') {
                                        return <div className='form-group radio'>
                                            <label htmlFor="">{field?.label} <span>{field?.isRequired && '*'}</span></label>
                                            {field?.radioItem && field.radioItem.map((radio, index) => (
                                                <div key={index} className="radio-list">
                                                    <input type="radio" id={radio?.value} name={`${radio[0]?.value}`} value={radio?.value} />
                                                    <label htmlFor={radio?.value}>{radio?.value}</label>
                                                </div>
                                            ))}
                                        </div>
                                    }

                                    if (field?.types === 'checkbox') {
                                        return <div className='form-group checkbox'>
                                            <label htmlFor="">{field?.label} <span>{field?.isRequired && '*'}</span></label>
                                            {field?.radioItem && field.checkboxItem.map((checkbox, index) => (
                                                <div key={index} className="checkbox-list">
                                                    <input type="checkbox" id={checkbox?.value} name={`${checkbox[0]?.value}`} value={checkbox?.value} />
                                                    <label htmlFor={checkbox?.value}>{checkbox?.value}</label>
                                                </div>
                                            ))}
                                        </div>
                                    }

                                    return field;
                                })
                            }
                        </Box>

                        {/* </form> */}

                    </Item>
                </Grid>
            }

        </Grid>
    )
}

export default FormBuild