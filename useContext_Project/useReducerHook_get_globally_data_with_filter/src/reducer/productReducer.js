const productReducer = (state, action) => {
    if (action.type === 'SET_LOADING') {
        return {
            ...state,
            isLoading: true,
        }
    }
    if (action.type === 'GET_DATA') {
        const featuredData = action.payload.filter((ele) => {
            return ele.featured === true;
        })
        return {
            ...state,
            isLoading: false,
            products: action.payload,
            featuredProducts: featuredData,
        }
    }
    if (action.type === 'API_ERROR') {
        return {
            ...state,
            isLoading: false,
            isError: true,
        }
    }
    return state;
}

export default productReducer;