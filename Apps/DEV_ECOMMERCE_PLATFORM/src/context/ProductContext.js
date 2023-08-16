import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/ProductReducer";

const ProductContext = createContext();

const API = 'https://api.pujakaitem.com/api/products';

const initialState = {
    products: [],
    featuredProducts: [],
    singleProduct: {},
    isLoading: false,
    isError: false,
    isSingleLoading: false,
    isSingleError: false,
}

const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getProducts = async (API) => {
        dispatch({ type: 'IS_LOADING' })
        try {
            const res = await axios.get(API);
            const data = res.data;
            dispatch({ type: 'GET_PRODUCTS', payload: data })
        } catch (error) {
            dispatch({ type: 'IS_ERROR' })
        }
    }

    const getSingleProduct = async (API) => {
        dispatch({ type: 'IS_SINGLE_LOADING' })
        try {
            const res = await axios.get(API);
            const singleData = res.data;
            dispatch({ type: 'GET_SINGLE_PRODUCTS', payload: singleData })
        } catch (error) {
            dispatch({ type: 'IS_SINGLE_ERROR' })
        }
    }


    useEffect(() => {
        getProducts(API);
    }, [])


    return <ProductContext.Provider value={{ ...state, getSingleProduct }}>{children}</ProductContext.Provider>
}

const useProductContext = () => {
    return useContext(ProductContext);
}

export { ProductContext, ProductProvider, useProductContext }