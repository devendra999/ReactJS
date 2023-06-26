import React from "react";
import "./styles.css";
import { Switch, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { ProductList } from "./Components/ProductList";
import { Cart } from "./Components/Cart";
import { Details } from "./Components/Details";
import { Default } from "./Components/Default";
import { Modal } from "./Components/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

export function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route path="/details" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route component={Default} />
      </Switch>
      <Modal />
    </>
  );
}
