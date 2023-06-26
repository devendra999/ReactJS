import React, { useState, useEffect } from "react";
import { storeProducts, detailProduct } from "./Data";
const ProductContext = React.createContext();

const ProductProvider = props => {
  const [products, setproducts] = useState([]);
  const [detailprod, setdetailprod] = useState(detailProduct);
  const [cart, setcart] = useState([]);
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalProduct, setmodalProduct] = useState(detailProduct);
  const [cartSubTotal, setcartSubTotal] = useState(0);
  const [cartTax, setcartTax] = useState(0);
  const [cartTotal, setcartTotal] = useState(0);

  useEffect(() => populateState(), []);
  useEffect(() => addTotals());

  const populateState = () => {
    let temProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      temProducts.push(singleItem);
    });
    setproducts(temProducts);
  };

  const getItem = id => {
    const product = products.find(item => item.id === id);
    return product;
  };

  const handleDetail = id => {
    const product = getItem(id);
    setdetailprod(() => product);
  };
  const addToCart = id => {
    let tempProducts = [...products];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    setproducts(() => tempProducts);
    setcart(() => [...cart, product]);
  };

  const openModal = id => {
    const product = getItem(id);
    setmodalProduct(() => product);
    setmodalOpen(() => true);
  };
  const closeModal = () => {
    setmodalOpen(() => false);
  };

  const increment = id => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    setcart(() => tempCart);
  };

  const decrement = id => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      removeItem(id);
    } else {
      product.total = product.count * product.price;
      setcart(() => tempCart);
    }
  };

  const removeItem = id => {
    let temProducts = [...products];
    let tempCart = [...cart];
    tempCart = tempCart.filter(item => item.id !== id);
    const index = temProducts.indexOf(getItem(id));
    let removedProduct = temProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    setproducts(() => temProducts);
    setcart(() => tempCart);
  };

  const clearCart = () => {
    setcart([]);
    populateState();
  };

  const addTotals = () => {
    let subTotal = 0;
    cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const Total = subTotal + tax;
    setcartSubTotal(subTotal);
    setcartTax(tax);
    setcartTotal(Total);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        detailprod,
        cart,
        handleDetail,
        addToCart,
        modalProduct,
        modalOpen,
        openModal,
        closeModal,
        cartSubTotal,
        cartTax,
        cartTotal,
        increment,
        decrement,
        removeItem,
        clearCart
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };
