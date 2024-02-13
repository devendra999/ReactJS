import React from "react";
import Product from "./Product";

import { ProductTypes } from "../store/productStore";

interface GridViewProps {
  product: ProductTypes[];
}

const GridView = ({ product }: GridViewProps) => {
  console.log(product);
  return (
    <>
      {product && product.length > 0
        ? product.map((prod, index) => {
            return <Product key={index} product={prod} />;
          })
        : "No product found"}
    </>
  );
};

export default GridView;
