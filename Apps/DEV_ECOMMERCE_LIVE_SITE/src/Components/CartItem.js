import React from "react";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/CartContext";
import FormatPrice from "../helper/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";

const CartItem = ({ id, name, image, color, price, amount }) => {
  const { removeItem, setDecrease, setIncrement } = useCartContext();
  // const setDecrease = () => {
  //   // amount > 1 ? setAmount(amount - 1) : setAmount(1);
  // };

  // const setIncrease = () => {
  //   // amount < stock ? setAmount(amount + 1) : setAmount(stock);
  // };

  return (
    <tr>
      <td className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={id} />
          </figure>
        </div>
        <div>
          <p>{name}</p>
          <div className="color-div">
            <p>color:</p>
            <div
              className="color-style"
              style={{ backgroundColor: color, color: color }}
            ></div>
          </div>
        </div>
      </td>
      {/* price   */}
      <td className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </td>

      {/* Quantity  */}
      <td>
        <CartAmountToggle
          amount={amount}
          setDecrease={() => setDecrease(id)}
          setIncrease={() => setIncrement(id)}
        />
      </td>

      {/* //Subtotal */}
      <td className="cart-hide">
        <p>
          <FormatPrice price={price * amount} />
        </p>
      </td>

      <td>
        <FaTrash className="remove_icon" onClick={() => removeItem(id)} />
      </td>
    </tr>
  );
};

export default CartItem;
