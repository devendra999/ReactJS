import { Box } from '@mui/material';
import './App.css';




import Students from './students/Students';

function App() {
  return (
    <>
      <Box style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Students />    
      </Box>    
    </>
  );
}

export default App;
