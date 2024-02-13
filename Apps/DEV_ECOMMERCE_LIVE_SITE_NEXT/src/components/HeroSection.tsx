import Link from "next/link";
import React from "react";

const HeroSection = ({ title, text }: { title: string; text: string }) => {
  return (
    <div className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col col-6">
            <div className="content">
              <span>WELCOME TO</span>

              <h2>{title}</h2>
              <p>{text}</p>
              <Link href="/products">Shop Now</Link>
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
