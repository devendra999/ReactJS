import React from "react";
import { CartItem } from "./CartItem";
import { ProductConsumer } from "../../Context";

export const CartList = () => {
  return (
    <ProductConsumer>
      {value => {
        return value.cart.map(item => {
          return (
            <div key={item.id} className="container-fluid">
              <CartItem item={item} value={value} />
            </div>
          );
        });
      }}
    </ProductConsumer>
  );
};
