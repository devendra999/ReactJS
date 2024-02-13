import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import CartAmountToggle from "./CartAmountToggle";
import Link from "next/link";

import { ProductTypes } from "../store/productStore";
import useStore from "../store/cartStore";

const AddToCart = ({ product }: { product: ProductTypes[] }) => {
  //   const { addToCart } = useCartContext();

  const { addToCart } = useStore();

  const { id, colors, stock } = product;

  const [color, setColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };

  return (
    <>
      <div className="colors mb-5">
        <p>
          Color:
          {colors.map((curColor, index) => {
            return (
              <button
                key={index}
                style={{ backgroundColor: curColor }}
                className={color === curColor ? "btnStyle active" : "btnStyle"}
                onClick={() => setColor(curColor)}
              >
                {color === curColor ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </p>
      </div>

      {/* add to cart  */}
      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />

      <Link href="/cart" onClick={() => addToCart(id, color, amount, product)}>
        <div className="mt-5">
          <button className="btn button-style">Add To Cart</button>
        </div>
      </Link>
    </>
  );
};
export default AddToCart;
