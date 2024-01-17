import React from "react";
import { Link } from "react-router-dom";
import FormatPrice from "../helper/FormatPrice";

const ListView = ({ product }) => {
  return (
    <>
      {product && product.length > 0 ? (
        product.map((prod) => {
          return (
            <div className="single-product listing w-100">
              <div className="image_box">
                <span className="category">{prod?.category}</span>
                <img src={prod?.image} />
              </div>
              <div className="detail">
                <h4 className="name">{prod?.name}</h4>
                <h6 className="Price mb-5">
                  <FormatPrice price={prod?.price} />
                </h6>
                <p>
                  {prod?.description.substring(0, 140)}{" "}
                  {prod?.description.trim().length > 140 && "..."}
                </p>
                <Link to={`/product/${prod?.id}`}>
                  <button className="button-style">Read More</button>
                </Link>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col w-100">
          <div className="text-center w-100" style={{ fontSize: "1.5rem" }}>
            No product found
          </div>
        </div>
      )}
    </>
  );
};

export default ListView;
