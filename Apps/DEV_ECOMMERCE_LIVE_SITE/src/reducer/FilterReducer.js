const FilterReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      // get price value
      let priceArray = action.payload.map((curPrice) => curPrice.price);

      let maxPrice = Math.max(...priceArray);
      let minPrice = Math.min(...priceArray);
      console.log(minPrice, maxPrice, "----price");

      return {
        ...state,
        filterdProducts: [...action.payload],
        allProducts: [...action.payload],
        filters: {
          ...state.filters,
          price: maxPrice,
          minPrice: minPrice,
          maxPrice,
        },
      };

    case "SET_GRID_VIEW":
      return {
        ...state,
        gridView: true,
      };

    case "SET_LIST_VIEW":
      return {
        ...state,
        gridView: false,
      };

    // get sort value
    case "GET_SORT_VALUE":
      return {
        ...state,
        sortValue: action.payload,
      };

    // sort products
    case "SORT_PRODUCTS":
      let newSortData;
      const { filterProducts, sortValue } = state;
      let tempSortProducts = [...filterProducts];

      const sortProduct = (a, b) => {
        if (sortValue === "lowest") {
          return a.price - b.price;
        }
        if (sortValue === "highest") {
          return b.price - a.price;
        }
        if (sortValue === "a-z") {
          return a.name.localeCompare(b.name);
        }
        if (sortValue === "z-a") {
          return b.name.localeCompare(a.name);
        }
      };

      newSortData = tempSortProducts.sort(sortProduct);

      return {
        ...state,
        filterProducts: newSortData,
      };

    // get filter value
    case "GET_FILTER_VALUE":
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    // filer products
    case "FILTER_PRODUCTS":
      let tempProducts;
      const { allProducts } = state;
      tempProducts = [...allProducts];

      const { text, company, category, colors, price } = state.filters;

      if (text) {
        tempProducts = tempProducts.filter((prod) =>
          prod.name.toLowerCase().includes(text)
        );
      }
      if (category !== "all") {
        tempProducts = tempProducts.filter(
          (prod) => prod.category === category
        );
      }
      if (company !== "all") {
        tempProducts = tempProducts.filter((prod) => prod.company === company);
      }

      if (colors !== "all") {
        tempProducts = tempProducts.filter((prod) =>
          prod.colors.includes(colors)
        );
      }

      if (price) {
        tempProducts = tempProducts.filter((curElem) => curElem.price <= price);
      }
      // console.log(tempProducts);

      return {
        ...state,
        filterProducts: tempProducts,
      };

    case "CLEAR_FILTER":
      return {
        ...state,
        gridView: true,
        sortValue: "lowest",
        filters: {
          ...state.filters,
          text: "",
          category: "all",
          company: "all",
          colors: "all",
          price: state.filters.maxPrice,
          minPrice: 0,
          maxPrice: state.filters.maxPrice,
        },
      };

    default:
      return {
        state,
      };
  }
};

export default FilterReducer;
