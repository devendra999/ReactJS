import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface ToastProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleClick(); // Call handleClick when component mounts to open the Snackbar by default
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            width: '100%',
            backgroundColor: 'red', 
            '& .MuiAlert-icon': { display: 'none' }, 
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
