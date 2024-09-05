import React from 'react';
import { Button } from '@mui/material';


 function IconButton (props:any) {
  return (
    <>
    <Button onClick={props.onClick} type={props.type} variant={props.varient} startIcon={props.startIcon} className={`btn ${props.className}` }>
        {props.ButtonTitle ? props.ButtonTitle : 'ButtonTitle'} 
        </Button>
         </>
  )
}

export default IconButton;