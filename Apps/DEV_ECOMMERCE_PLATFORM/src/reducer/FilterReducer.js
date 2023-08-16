const FilterReducer = (state, action) => {
    switch (action.type) {
        case 'GET_ALL_PRODUCTS':

            // get price value
            let priceArray = action.payload.map((curPrice) => curPrice.price);

            let maxPrice = Math.max(...priceArray);



            return {
                ...state,
                allProducts: [...action.payload],
                filterProducts: [...action.payload],
                filters: {
                    ...state.filters,
                    price: maxPrice,
                    maxPrice,
                }
            }

        case 'SET_GRID_VIEW':
            return {
                ...state,
                gridView: true,
            }
        case 'SET_LIST_VIEW':
            return {
                ...state,
                gridView: false,
            }

        case 'GET_SORT_VALUE':
            return {
                ...state,
                sortValue: action.payload,
            }

        case 'SORT_PRODUCTS':
            let newSortData;
            const { filterProducts, sortValue } = state;
            let tempSortProducts = [...filterProducts];


            const sortingProducts = (a, b) => {

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

            newSortData = tempSortProducts.sort(sortingProducts);
            console.log(newSortData)

            return {
                ...state,
                filterProducts: newSortData,
            }


        // GET_FILTER_VALUE
        case 'GET_FILTER_VALUE':
            const { name, value } = action.payload;

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value,
                }
            }

        // FILTER_PRODUCTS
        case 'FILTER_PRODUCTS':
            let tempProducts;
            const { allProducts } = state;
            tempProducts = [...allProducts];

            const { text, category, company, colors, price } = state.filters;

            if (text) {
                tempProducts = tempProducts.filter((curElem) => curElem.name.toLowerCase().includes(text));
                // console.log(tempProducts)
            }

            if (category !== 'All') {
                tempProducts = tempProducts.filter((curElem) => curElem.category === category);
                // console.log(tempProducts)
            }

            if (company !== 'All') {
                tempProducts = tempProducts.filter((curElem) => curElem.company === company);
                // console.log(tempProducts)
            }

            if (colors !== 'All') {
                tempProducts = tempProducts.filter((curElem) => curElem.colors.includes(colors));
                // console.log(tempProducts)
            }

            if (price) {
                tempProducts = tempProducts.filter((curElem) => curElem.price <= price);
                // console.log(tempProducts)
            }

            return {
                ...state,
                filterProducts: tempProducts,
            }

        case 'CLEAR_FILTER':
            return {
                ...state,
                gridView: true,
                sortValue: 'lowest',
                filters: {
                    ...state.filters,
                    text: '',
                    category: 'All',
                    company: 'All',
                    colors: 'All',
                    price: state.filters.maxPrice,
                    minPrice: 0,
                    maxPrice: state.filters.maxPrice,
                }
            }

        default: return state;
    }
}

export default FilterReducer