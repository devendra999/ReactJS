import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { App } from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductProvider } from "./Context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ProductProvider>
    <Router>
      <App />
    </Router>
  </ProductProvider>,
  rootElement
);
