import axios from "axios";
import { create } from "zustand";

export interface ProductTypes {
  id: string;
  image: string;
  name: string;
  price: number;
  featured: boolean;
  description: string;
  company: string;
  category: string;
  colors: string[];
}

interface StateTypes {
  products: ProductTypes[];
  featuredProducts: ProductTypes[];
  filterProducts: ProductTypes[];
  singleProduct: ProductTypes[];
  gridView: boolean;
  sortValue: string;
  getProducts: () => Promise<void>;
  getSingleProduct: () => Promise<void>;
}

const useStore = create<StateTypes>((set, get) => ({
  products: [],
  featuredProducts: [],
  filterProducts: [],
  allProducts: [],
  singleProduct: [],
  gridView: true,
  sortValue: "lowest",
  filters: {
    text: "",
    category: "",
    company: "",
    colors: "all",
    price: 0,
    minPrice: 0,
    maxPrice: 0,
  },

  getProducts: async () => {
    try {
      const { data } = await axios.get(
        "https://api.pujakaitem.com/api/products"
      );
      let priceArray = data.map((curPrice) => curPrice.price);

      let maxPrice = Math.max(...priceArray);
      let minPrice = Math.min(...priceArray);

      let featuredData = data.filter(
        (product: ProductTypes) => product?.featured === true
      );
      set((state: StateTypes) => ({
        ...state,
        products: data,
        featuredProducts: featuredData,
        filterProducts: data,
        allProducts: data,
        filters: {
          ...state.filters,
          price: maxPrice,
          minPrice: minPrice,
          maxPrice,
        },
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  getSingleProduct: async (url) => {
    try {
      const { data } = await axios.get(url);
      set((state: StateTypes) => ({
        ...state,
        singleProduct: data,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  setSingleProduct: () => {
    set((state) => ({
      singleProduct: [],
    }));
  },
  setGridView: () => {
    set((state) => ({ gridView: true }));
  },
  setListView: () => {
    set((state) => ({ gridView: false }));
  },
  sorting: (e) => {
    let name = e.target.name;
    let sortValue = e.target.value;

    let newSortData;
    let tempSortProducts = [...get().filterProducts];

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

    set((state) => ({ filterProducts: newSortData }));
  },
  updateFilter: (name, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [name]: value,
      },
    }));
    const { text, category, company, colors, price } = get().filters;
    let tempProducts = [...get().allProducts];

    // Apply text filter
    if (text) {
      tempProducts = tempProducts.filter((prod) =>
        prod.name.toLowerCase().includes(text.toLowerCase())
      );
    }

    // Apply category filter if it's not an empty string
    if (category !== "all" && category !== "") {
      tempProducts = tempProducts.filter((prod) => prod.category === category);
    }

    // Apply company filter if it's not an empty string
    if (company !== "all" && company !== "") {
      tempProducts = tempProducts.filter((prod) => prod.company === company);
    }

    // Apply colors filter if it's not an empty string
    if (colors !== "all" && colors !== "") {
      tempProducts = tempProducts.filter((prod) =>
        prod.colors.includes(colors)
      );
    }

    // Apply price filter if it's not an empty string
    if (price !== null && price !== 0) {
      tempProducts = tempProducts.filter((curElem) => curElem.price <= price);
    }

    set({ filterProducts: tempProducts });
  },

  // clearfilter
  clearFilter: () => {
    const company = document.getElementById("company");
    const sort = document.getElementById("sort");
    // Set the selectedIndex to 0 to select the first option
    company.selectedIndex = 0;
    sort.selectedIndex = 0;

    const { maxPrice } = get().filters; // Get the maximum price from the current filters
    set((state) => ({
      ...state,
      gridView: true,
      sortValue: "lowest",
      filters: {
        text: "",
        category: "all",
        company: "all",
        colors: "all",
        price: maxPrice, // Reset price to the maximum price
        minPrice: 0,
        maxPrice: maxPrice, // Reset maxPrice to the maximum price
      },
      filterProducts: state.allProducts, // Reset filtered products to all products
    }));
  },
}));

export default useStore;
