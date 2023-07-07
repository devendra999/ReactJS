import { createContext } from 'react';
import ComA from './components/useContext/ComA';


// create Context
const FirstName = createContext();
const LastName = createContext();



function App() {
  return (
    <>

      {/* useContext */}
      <FirstName.Provider value={'Gies'}>
        <LastName.Provider value={'port'}>
          <ComA />
        </LastName.Provider>
      </FirstName.Provider>

    </>
  );
}

export default App;
// useContext
export { FirstName, LastName };
