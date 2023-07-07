import { createContext } from 'react';
import './App.css';

// Context API
import ComA from './components/contextAPI/ComA';



const FirstName = createContext();
const LastName = createContext();


function App() {
  return (
    <>
    
    {/* Context API */}
    <FirstName.Provider value={'Gies'}>
      <LastName.Provider value={'port'}>
        <ComA />
      </LastName.Provider>
    </FirstName.Provider>

    </>
  );
}

export default App;
// context api
export { FirstName, LastName };
