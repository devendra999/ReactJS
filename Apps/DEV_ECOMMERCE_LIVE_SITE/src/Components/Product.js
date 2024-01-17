import React from "react";
import { Link } from "react-router-dom";
import FormatPrice from "../helper/FormatPrice";

const Product = ({ product }) => {
  // console.log(product);
  return (
    <>
      <div className="single-product col-4">
        <Link to={`/product/${product?.id}`}>
          <div className="image_box">
            <span className="category">{product?.category}</span>
            <img className="w-100" src={product?.image} />
          </div>
          <div className="detail w-100 d-flex align-items-center justify-content-between">
            <h4 className="name">{product?.name}</h4>
            <h6 className="Price">
              <FormatPrice price={product?.price} /> {}
            </h6>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Product;
