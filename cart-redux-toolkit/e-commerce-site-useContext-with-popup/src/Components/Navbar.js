import React from "react";
import logo from "../flower-logo.jpg";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";
import { NavWrapper } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  return (
    <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
      <Link to="/">
        <img src={logo} alt="store" className="navbar-brand" />
      </Link>
      <ul className="navbar-nav align-items-center">
        <li className="nav-item ml-5">
          <Link to="/" className="nav-link">
            products
          </Link>
        </li>
      </ul>
      <div className="ml-2">
        <a href="https://x8qwe.codesandbox.io/" style={{ fontSize: 25 }}>
          my cv
        </a>
      </div>
      <Link to="/cart" className="ml-auto">
        <ButtonContainer>
          <span className="mr-2">
            <FontAwesomeIcon icon={faCartPlus} />
            my cart
          </span>
        </ButtonContainer>
      </Link>
    </NavWrapper>
  );
};
