import { Box } from '@mui/material';
import './App.css';
import About from './components/About';

function App() {
  return (
    <>
      <Box style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Hwllo</h1>  
        <About />
      </Box>    
    </>
  );
}

export default App;
