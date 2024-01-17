import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray shadow">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="logo col">
            <Link to="/">
              <img src="./logo.png" />
            </Link>
          </div>
          <ul className="menu d-flex col">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
