import { Button } from '@mui/material'
import React from 'react'

const ButtonComp = () => {
  return (
    <>
       <Button variant="contained" >Hello world</Button>
       <Button variant="contained" color="primary">Primary Button</Button>
      <Button variant="contained" color="secondary">Secondary Button</Button>
    </>
  )
}

export default ButtonComp