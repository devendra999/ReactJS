// create context
import { createContext, useContext } from "react";


// createcontext and save in variable and export it
const AppContext = createContext();

// add to provider full application and export it
const AppProvider = ({children}) => {
    return <AppContext.Provider value={{ name: 'Devendra' }}>
        {children}
    </AppContext.Provider>
    
}


// custom hook
const useProductContext = () => { // make sure custom hook function name always starte with (use) keyword like useProductContext and export it
    return useContext(AppContext);
}


export { AppProvider, AppContext, useProductContext };