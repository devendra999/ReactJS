// create context
import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/productReducer'


// createcontext and save in variable and export it
const AppContext = createContext();

const initialState = {
    isLoading: false,
    isEror: false,
    products: [],
    featuredProducts: [],
}

// add to provider full application and export it
const AppProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const getusers = async () => {
        dispatch({type: 'SET_LOADING'})
        try {
            const res = await axios.get('https://64aea825c85640541d4d7d04.mockapi.io/users');
            const product = res.data;
            dispatch({ type: 'GET_DATA', payload: product })   
        } catch(error) {
            dispatch({type: 'API_ERROR'})
        }
    }
    
    useEffect(() => {
        getusers();
    }, [])
    


    return <AppContext.Provider value={{ ...state }}>
        {children}
    </AppContext.Provider>
    
}


// custom hook
const useProductContext = () => { // make sure custom hook function name always starte with (use) keyword like useProductContext and export it
    return useContext(AppContext);
}


export { AppProvider, AppContext, useProductContext };