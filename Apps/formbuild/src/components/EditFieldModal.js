import React, { useEffect, useState } from 'react'

// react hook form
import { useForm, Controller, useFieldArray } from "react-hook-form"

// box
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

// close icon
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// plus icon
import AddCircleIcon from '@mui/icons-material/AddCircle';

// delate icon
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// checkbox
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// grid
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useFieldContext } from '../context/fieldContext';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    borderRadius: '1.25rem',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
};

const closeStyle = {
    position: 'absolute',
    top: '.9375rem',
    right: '.9375rem',
    cursor: 'pointer',
}

let renderCount = 0;

const EditFieldModal = (props) => {
    const { editField } = useFieldContext();

    const [inputType, setInputType] = useState('');
    const [checked, setChecked] = React.useState(false);

    // const [text, setText] = useState(false);
    // const [textLength, setTextLength] = useState(false);
    // const [number, setNumber] = useState(false);
    // const [email, setEmail] = useState(false);
    // const [radio, setRadio] = useState(false);
    // const [checkbox, setCheckbox] = useState(false);

    const handleChange = (event) => {
        setInputType(event.target.value);
    };

    const checkboxHandleChange = (event) => {
        setChecked(event.target.checked);

    };

    const { register, control, reset, handleSubmit, resetField, setValue, formState: { errors } } = useForm();
    renderCount++;


    const {
        fields: radioItem,
        append: radioAppend,
        remove: radioRemove
    } = useFieldArray({ control, name: "radioItem" });
    const {
        fields: checkboxItem,
        append: checkboxAppend,
        remove: checkboxRemove
    } = useFieldArray({ control, name: "checkboxItem" });





    const handleSetValue = () => {
        setValue('radioItem', []);
        setValue('checkboxItem', []);

        if (inputType === 'radio') {
            setValue('radioItem', [{ id: 1, value: 'Radio One' }, { id: 2, value: 'Radio Two' }]);
        } else if (inputType === 'checkbox') {
            setValue('checkboxItem', [{ id: 1, value: 'Checkbox One' }, { id: 2, value: 'Checkbox Two' }]);
        }
    }

    useEffect(() => {
        setChecked(props?.editField?.[0]?.isRequired);
        reset(props?.editField?.[0]);
        setInputType(props?.editField?.[0]?.types);

        setTimeout(() => {
            resetField("radioItem");
            resetField("checkboxItem");
        }, 100);

    }, [])


    const onSubmit = (data) => {
        editField(data)
        reset();
        setInputType('');
        setChecked(false);
        props.handleEditClose();
    }

    useEffect(() => {
        handleSetValue();
    }, [inputType])

    const handleTrimValue = (e) => {
        let stringValue = e.target.value
        e.target.value = stringValue.replace(/\s\s+/g, ' ');
    };


    return (
        <>
            <Modal
                open={props.editOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <HighlightOffIcon sx={closeStyle} onClick={props.handleEditClose} />
                    <Typography id="modal-modal-title" variant="h5" component="h5">
                        Update field
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* select */}
                        <Box style={{ marginTop: '1.875rem' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={inputType}
                                    label="Select Type"
                                    {...register("types", { required: true })}
                                    onChange={handleChange}
                                >
                                    <MenuItem value='text'>Text</MenuItem>
                                    <MenuItem value='number'>Number</MenuItem>
                                    <MenuItem value='email'>Email</MenuItem>
                                    <MenuItem value='radio'>Radio</MenuItem>
                                    <MenuItem value='checkbox'>Checkbox</MenuItem>
                                </Select>
                            </FormControl>
                            {errors.types?.type === "required" && (
                                <Box className='error' role="alert">Please select field type</Box>
                            )}
                        </Box>

                        {/* text */}
                        <Box style={{ marginTop: '1.875rem' }}>
                            <TextField type='text'
                                onKeyUp={handleTrimValue}
                                {...register("label", { required: true, minLength: 5, maxLength: 50 })}
                                fullWidth id="outlined-basic" label="Placeholder"
                                variant="outlined" />
                            {errors.label?.type === "required" && (
                                <Box className='error' role="alert">Please enter label name</Box>
                            )}
                            {(errors.label?.type === "minLength" || errors.label?.type === "maxLength") && (
                                <Box className='error' role="alert">Please enter label name between 5 to 50 character</Box>
                            )}
                        </Box>

                        {/* number */}
                        {
                            inputType === 'text' || inputType === 'number' ? (
                                <>
                                    <Box style={{ marginTop: '1.875rem' }}>
                                        <TextField type='number'  {...register("minLength")} fullWidth id="outlined-basic" label="Min Length" variant="outlined" />
                                    </Box>
                                    <Box style={{ marginTop: '1.875rem' }}>
                                        <TextField type='number'   {...register("maxLength")} fullWidth id="outlined-basic" label="Max Length" variant="outlined" />
                                    </Box>
                                </>
                            ) : ''

                        }

                        {/* radio */}
                        {
                            inputType === 'radio' &&
                            <Box style={{ marginTop: '1.875rem' }}>
                                <Grid container style={{ position: 'relative' }}>
                                    <Typography id="modal-modal-title" variant="p" component="b" style={{ marginBottom: '1.25rem', display: 'block' }}>
                                        Radio Names
                                    </Typography>
                                    {
                                        radioItem.length < 6 &&
                                        <AddCircleIcon
                                            onClick={() => radioAppend({ id: new Date().getTime() })}
                                            style={{ position: 'absolute', right: 0, cursor: 'pointer', color: '#12a006', fontSize: '1.875rem' }}
                                        />
                                    }

                                </Grid>
                                {radioItem.map((field, index) => (
                                    <Grid key={field.id} container spacing={2} style={{ marginTop: '.125rem', display: 'flex', alignItems: 'center', }}>
                                        <Grid item xs={10} >
                                            <TextField onKeyUp={handleTrimValue} {...register(`radioItem.${index}.value`, { required: true, minLength: 3, maxLength: 50 })} type='text' fullWidth id="outlined-basic" placeholder='Radio button name' variant="outlined" />

                                        </Grid>

                                        <Grid item xs={2}>
                                            {
                                                radioItem.length > 2 &&
                                                <DeleteOutlineIcon
                                                    onClick={() => radioRemove(index)}
                                                    style={{ color: '#f00', fontSize: '1.875rem', }}
                                                />
                                            }

                                        </Grid>
                                        {errors.radioItem?.[index]?.value?.type === "required" && (
                                            <Grid item xs={12} style={{ paddingTop: 0 }}>
                                                <Box className='error' role="alert">Please fill radio button name</Box>
                                            </Grid>
                                        )}
                                        {(errors.radioItem?.[index]?.value?.type === "minLength" || errors.radioItem?.[index]?.value?.type === "maxLength") && (
                                            <Grid item xs={12} style={{ paddingTop: 0 }}>
                                                <Box className='error' role="alert">Please fill radio button text between 3 to 50 characters</Box>
                                            </Grid>
                                        )}
                                    </Grid>
                                ))}



                            </Box>
                        }

                        {/* checkbox */}
                        {
                            inputType === 'checkbox' &&
                            <Box style={{ marginTop: '1.875rem' }}>
                                <Grid container style={{ position: 'relative' }}>
                                    <Typography id="modal-modal-title" variant="p" component="b" style={{ marginBottom: '1.25rem', display: 'block' }}>
                                        Checkbox Names
                                    </Typography>
                                    {
                                        checkboxItem.length < 6 &&
                                        <AddCircleIcon
                                            onClick={() => checkboxAppend({ id: new Date().getTime() })}
                                            style={{ position: 'absolute', right: 0, cursor: 'pointer', color: '#12a006', fontSize: '1.875rem' }} />
                                    }
                                </Grid>

                                {checkboxItem.map((field, index) => (
                                    <Grid key={field.id} container spacing={2} style={{ marginTop: '.125rem', display: 'flex', alignItems: 'center', }}>
                                        <Grid item xs={10}>
                                            <TextField onKeyUp={handleTrimValue} {...register(`checkboxItem.${index}.value`, { required: true, minLength: 3, maxLength: 50 })} type='text' fullWidth id="outlined-basic" placeholder='Name' variant="outlined" />

                                        </Grid>
                                        <Grid item xs={2}>
                                            {
                                                checkboxItem.length > 2 &&
                                                <DeleteOutlineIcon
                                                    onClick={() => checkboxRemove(index)}
                                                    style={{ color: '#f00', fontSize: '1.875rem', }}
                                                />
                                            }
                                        </Grid>
                                        {errors.checkboxItem?.[index]?.value?.type === "required" && (
                                            <Grid item xs={12} style={{ paddingTop: 0 }}>
                                                <Box className='error' role="alert">Please fill checkbox button name</Box>
                                            </Grid>
                                        )}
                                        {(errors.checkboxItem?.[index]?.value?.type === "minLength" || errors.checkboxItem?.[index]?.value?.type === "maxLength") && (
                                            <Grid item xs={12} style={{ paddingTop: 0 }}>
                                                <Box className='error' role="alert">Please fill radio button text between 3 to 50 characters</Box>
                                            </Grid>
                                        )}
                                    </Grid>
                                ))}

                            </Box>
                        }

                        {/* required */}
                        <Box style={{ marginTop: '1.875rem' }}>
                            <FormGroup  >
                                <FormControlLabel
                                    label="Required"
                                    checked={checked}
                                    {...register("isRequired")}
                                    control={<Checkbox onChange={checkboxHandleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}

                                    />}
                                />
                            </FormGroup>
                        </Box>



                        {/* save button */}
                        <Box style={{ marginTop: '1.875rem' }}>
                            <Button type='submit' variant="contained">Update</Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default EditFieldModal