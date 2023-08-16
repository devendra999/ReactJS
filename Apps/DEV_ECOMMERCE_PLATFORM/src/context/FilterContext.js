import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import reducer from "../reducer/FilterReducer";



const FilterContext = createContext();


const initialState = {
    allProducts: [],
    filterProducts: [],
    gridView: true,
    sortValue: 'lowest',
    filters: {
        text: '',
        category: 'All',
        company: 'All',
        colors: 'All',
        price: 0,
        minPrice: 0,
        maxPrice: 0,
    }
}

const FilterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { products } = useProductContext();

    const setGridView = () => {
        dispatch({ type: 'SET_GRID_VIEW' });
    }
    const setListView = () => {
        dispatch({ type: 'SET_LIST_VIEW' });
    }

    const sorting = (event) => {
        let userValue = event.target.value;
        dispatch({ type: 'GET_SORT_VALUE', payload: userValue })
    }

    const updateFilter = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        dispatch({ type: 'GET_FILTER_VALUE', payload: { name, value } })
    }

    const clearFilter = () => {
        let sort = document.getElementById('sort');
        sort.selectedIndex = 0;
        dispatch({ type: 'CLEAR_FILTER' })
    }


    useEffect(() => {
        dispatch({ type: 'FILTER_PRODUCTS' })
        dispatch({ type: 'SORT_PRODUCTS' })
    }, [products, state.sortValue, state.filters])


    useEffect(() => {
        dispatch({ type: 'GET_ALL_PRODUCTS', payload: products })
    }, [products])


    return <FilterContext.Provider value={{ ...state, setGridView, setListView, updateFilter, sorting, clearFilter }}>{children}</FilterContext.Provider>
}

const useFilterContext = () => {
    return useContext(FilterContext);
}

export { FilterContext, FilterProvider, useFilterContext };