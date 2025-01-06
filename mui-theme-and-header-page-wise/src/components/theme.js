// theme.js
"use client";
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ab47bc',
      main: '#9c27b0',
      dark: '#7b1fa2',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffd54f',
      main: '#ffc107',
      dark: '#ff8f00 ',
      contrastText: '#000',
    },
  },
});

export default theme;
