import React from "react";
import { Title } from "./Title";
import { Product } from "./Product";
import { ProductConsumer } from "../Context";

export const ProductList = () => {
  return (
    <>
      <div className="py-5">
        <div className="container">
          <Title name="our" title="products" />
          <div className="row" />
          <ProductConsumer>
            {value => {
              return value.products.map(product => {
                return <Product key={product.id} product={product} />;
              });
            }}
          </ProductConsumer>
        </div>
      </div>
    </>
  );
};
