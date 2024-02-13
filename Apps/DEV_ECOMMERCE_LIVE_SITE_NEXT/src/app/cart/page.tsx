"use client";
import CartItem from "@/components/CartItem";
import FormatPrice from "@/helper/FormatPrice";
import useStore from "@/store/cartStore";
import Link from "next/link";
import { useEffect } from "react";

const Cart = () => {
  // const { cart, clearCart, total_price, shipping_fee } = useCartContext();

  const { cart, shipping_fee, clearCart, total_price, totalPrice } = useStore();
  console.log(cart, "cart page....");

  useEffect(() => {
    // Call totalPrice function when the component mounts
    totalPrice();
  }, []);

  if (cart.length === 0) {
    return (
      <div className="space">
        <div className="container">
          <h3
            style={{
              padding: "10rem 0",
              fontWeight: 300,
              textAlign: "center",
              fontSize: "3rem",
            }}
          >
            No Cart in Item
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="space">
      <div className="container">
        <table className="cart_table">
          <thead>
            <tr>
              <td>Item</td>
              <td className="cart-hide">Price</td>
              <td>Quantity</td>
              <td className="cart-hide">Subtotal</td>
              <td>Remove</td>
            </tr>
          </thead>
          <tbody className="cart-item">
            {cart &&
              cart.length > 0 &&
              cart.map((curElem) => <CartItem key={curElem.id} {...curElem} />)}
          </tbody>
        </table>
        <hr />
        <div className="cart-two-button">
          <Link href="/products">
            <button className="button-style"> Continue Shopping </button>
          </Link>
          <button className="danger button btn-clear" onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        {/* order total_amount */}
        <div className="order-total--amount">
          <div className="order-total--subdata">
            <div>
              <p>subtotal:</p>
              <p>
                <FormatPrice price={total_price} />
              </p>
            </div>
            <div>
              <p>shipping fee:</p>
              <p>
                <FormatPrice price={shipping_fee} />
              </p>
            </div>
            <hr />
            <div>
              <p>order total:</p>
              <p>
                <FormatPrice price={shipping_fee + total_price} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
