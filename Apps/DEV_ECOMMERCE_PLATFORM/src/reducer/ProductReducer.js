const ProductReducer = (state, action) => {
    switch (action.type) {
        case 'IS_LOADING':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_PRODUCTS':
            return {
                ...state,
                isLoading: false,
                products: action.payload,
                featuredProducts: action.payload.filter((curElem) => curElem?.featured === true)
            }
        case 'IS_ERROR':
            return {
                ...state,
                isLoading: false,
                isError: true,
            }


        // get Single product
        case 'IS_SINGLE_LOADING':
            return {
                ...state,
                isSingleLoading: true,
            }

        case 'IS_SINGLE_ERROR':
            return {
                ...state,
                isSingleLoading: false,
                isSingleError: true,
            }

        case 'GET_SINGLE_PRODUCTS':
            return {
                ...state,
                isSingleLoading: false,
                singleProduct: action.payload,

            }


        default: return state;
    }
}

export default ProductReducer