import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

 const CheckboxItem = (props:any) => {
  return (
    <FormGroup>
    <FormControlLabel className={props.className}  control={<Checkbox />}  label={props.label} />
  </FormGroup>
  )
}


export default CheckboxItem;