import React from "react";
import { Link } from "react-router-dom";

const HeroSection = ({ title, text }) => {
  return (
    <div className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col col-6">
            <div className="content">
              <span>WELCOME TO</span>

              <h2>{title}</h2>
              <p>{text}</p>
              <Link to="/products">Shop Now</Link>
            </div>
          </div>
          <div className="col col-6">
            <div className="hero-img">
              <img src="hero.jpg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
