import { create } from "zustand";
import { devtools } from "zustand/middleware";

const getLocalCartData = () => {
  let item = localStorage.getItem("Store");
  if (item) {
    return JSON.parse(item);
  } else {
    return [];
  }
};

const useStore = create(
  devtools((set, get) => ({
    cart: getLocalCartData(),
    // cart: [],
    total_item: "",
    total_price: "",
    shipping_fee: 500,

    addToCart: (id, color, amount, product) => {
      let existingProduct = get().cart.find(
        (curItem) => curItem.id === id + color
      );
      if (existingProduct) {
        let updatedProduct = get().cart.map((curElem) => {
          if (curElem.id === id + color) {
            let newAmount = curElem.amount + amount;

            if (newAmount >= curElem.max) {
              newAmount = curElem.max;
            }
            return {
              ...curElem,
              amount: newAmount,
            };
          } else {
            return curElem;
          }
        });
        set((state) => ({
          ...state,
          cart: updatedProduct,
        }));
      } else {
        let cartProduct = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.image[0].url,
          price: product.price,
          max: product.stock,
        };

        set((state) => ({
          ...state,
          cart: [...state.cart, cartProduct],
        }));
        get().totalPrice();
      }
      localStorage.setItem("Store", JSON.stringify(get().cart));
    },
    setIncrement: (id) => {
      let updatedProduct = get().cart.map((curElem) => {
        if (curElem.id === id) {
          let incAmount = curElem.amount + 1;

          if (incAmount >= curElem.max) {
            incAmount = curElem.max;
          }

          return {
            ...curElem,
            amount: incAmount,
          };
        } else {
          return curElem;
        }
      });

      set((state) => ({
        ...state,
        cart: updatedProduct,
      }));
      get().totalPrice();
      localStorage.setItem("Store", JSON.stringify(get().cart));
    },
    setDecrease: (id) => {
      let updatedProduct = get().cart.map((curElem) => {
        if (curElem.id === id) {
          let decAmount = curElem.amount - 1;

          if (decAmount <= 1) {
            decAmount = 1;
          }

          return {
            ...curElem,
            amount: decAmount,
          };
        } else {
          return curElem;
        }
      });
      set((state) => ({
        ...state,
        cart: updatedProduct,
      }));
      get().totalPrice();
      localStorage.setItem("Store", JSON.stringify(get().cart));
    },
    removeItem: (id) => {
      let updatedCart = get().cart.filter((curItem) => curItem.id !== id);

      set((state) => ({
        ...state,
        cart: updatedCart,
      }));
      get().totalPrice();
      localStorage.setItem("Store", JSON.stringify(get().cart));
    },
    clearCart: () => {
      set((state) => ({
        ...state,
        cart: [],
      }));
      get().totalPrice();
      localStorage.setItem("Store", JSON.stringify(get().cart));
    },

    // CART_ITEM_PRICE_TOTAL: () => {
    totalPrice: () => {
      let { total_item, total_price } = get().cart.reduce(
        (accum, curElem) => {
          let { price, amount } = curElem;

          accum.total_item += amount;
          accum.total_price += price * amount;

          return accum;
        },
        {
          total_item: 0,
          total_price: 0,
        }
      );

      set((state) => ({
        ...state,
        total_item,
        total_price,
      }));
      localStorage.setItem("Store", JSON.stringify(get().cart));
    },
  }))
);

export default useStore;
