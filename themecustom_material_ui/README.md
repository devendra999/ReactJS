# Getting Started with Create React App

    you need to import this from material and react js and after that need to create function
        import { createTheme } from '@mui/material';
        import { ThemeProvider } from '@emotion/react';

# Create function
    const outerTheme = createTheme({
        palette: {
            primary: {
                main: '#f00',
            },
        },
    });

# Call theme
    <ThemeProvider theme={outerTheme}>
        content Goes here
    </ThemeProver>


# All done we can implement it all site call this in index.js or app.js directly
    <ThemeProvider theme={outerTheme}>
        content Goes here
    </ThemeProver>