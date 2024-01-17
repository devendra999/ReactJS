import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/FilterReducer";
import { useProductContext } from "./ProductContext";

export const FilterContext = createContext();

export const useFilterContext = () => {
  return useContext(FilterContext);
};

const initialState = {
  allProducts: [],
  filterProducts: [],
  gridView: true,
  sortValue: "lowest",
  filters: {
    text: "",
    category: "all",
    company: "all",
    colors: "all",
    price: 0,
    minPrice: 0,
    maxPrice: 0,
  },
};
export const FilterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = useProductContext();

  const setGridView = () => {
    dispatch({ type: "SET_GRID_VIEW" });
  };
  const setListView = () => {
    dispatch({ type: "SET_LIST_VIEW" });
  };

  const sorting = (e) => {
    let value = e.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload: value });
  };

  const updateFilter = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name, value);
    dispatch({ type: "GET_FILTER_VALUE", payload: { name, value } });
  };

  const clearFilter = () => {
    let sort = document.getElementById("sort");
    sort.selectedIndex = 0;
    dispatch({ type: "CLEAR_FILTER" });
  };

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
    dispatch({ type: "SORT_PRODUCTS" });
  }, [products, state.sortValue, state.filters]);

  useEffect(() => {
    dispatch({ type: "GET_ALL_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateFilter,
        sorting,
        clearFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
