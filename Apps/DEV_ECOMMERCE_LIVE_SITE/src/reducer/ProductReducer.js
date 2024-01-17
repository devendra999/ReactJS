const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "GET_PRODUCTS":
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        featuredProducts: action.payload.filter(
          (prod) => prod.featured === true
        ),
      };

    case "SET_SINGLE_LOADING":
      return {
        ...state,
        isSingleLoading: true,
      };

    case "GET_SINGLE_PRODUCTS":
      return {
        ...state,
        isSingleLoading: false,
        singleProduct: action.payload,
      };

    default:
      return {
        state,
      };
  }
};

export default ProductReducer;
