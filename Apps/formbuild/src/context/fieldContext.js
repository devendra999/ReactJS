// create context
import { useReducer, useEffect } from "react";
import { createContext, useContext } from "react";
import reducer from "../reducer/fieldReducer";




// createcontext and save in variable and export it
const fieldContext = createContext();

const getLocalFields = () => {
    let localFieldsData = localStorage.getItem("form-field");
    const parsedFields = JSON.parse(localFieldsData);
    if (!Array.isArray(parsedFields)) return [];

    return parsedFields;
};

const initialState = {
    isLoading: false,
    fields: getLocalFields(),
}

// add to provider full application and export it
const FieldProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)


    const addField = (field) => {
        dispatch({ type: 'ADD_FIELD', payload: field })
    }

    const editField = (field) => {
        dispatch({ type: 'EDIT_FIELD', payload: field })
    }

    const removeField = (field) => {
        dispatch({ type: 'REMOVE_FIELD', payload: field })
    }

    useEffect(() => {
        localStorage.setItem("form-field", JSON.stringify(state.fields));
    }, [state.fields]);

    return <fieldContext.Provider value={{ ...state, addField, editField, removeField }}>
        {children}
    </fieldContext.Provider>

}


// custom hook
const useFieldContext = () => { // make sure custom hook function name always starte with (use) keyword like useProductContext and export it
    return useContext(fieldContext);
}

export { FieldProvider, fieldContext, useFieldContext };