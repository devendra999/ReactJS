import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/ProductReducer";

export const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

const API = "https://api.pujakaitem.com/api/products";

const initialState = {
  products: [],
  featuredProducts: [],
  singleProduct: {},
  isLoading: false,
  isError: false,
  isSingleLoading: false,
  isSingleError: false,
};
export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const data = "Hello from Context in Next.js!";

  const getProducts = async (API) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(API);
      const products = res.data;
      //   console.log(products);
      dispatch({ type: "GET_PRODUCTS", payload: products });
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleProduct = async (API) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(API);
      const product = res.data;
      //   console.log(products);
      dispatch({ type: "GET_SINGLE_PRODUCTS", payload: product });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <ProductContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
