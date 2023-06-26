import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const CartItem = ({ item, value }) => {
  const { id, title, img, price, total, count } = item;
  const { increment, decrement, removeItem } = value;
  const myst = {
    display: "flex",
    flexDirrection: "row"
  };
  return (
    <div className="my-2 text-capitalize text-center" style={myst}>
      <div className="mx-auto">
        <img
          src={img}
          style={{ width: "5rem", height: "5rem" }}
          className="img-fluid"
          alt="product"
        />
        <div className="mx-auto">product : {title}</div>
        <div className="mx-auto">price : {price}</div>

        <div className="d-flex justify-content-center">
          <span className="btn btn-black mx-1" onClick={() => decrement(id)}>
            -
          </span>
          <span className="btn btn-black mx-1">{count}</span>
          <span className="btn btn-black mx-1" onClick={() => increment(id)}>
            +
          </span>
        </div>
        {/* */}

        <div className="cart-icon" onClick={() => removeItem(id)}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <strong>item total : $ {total}</strong>
      </div>
    </div>
  );
};
