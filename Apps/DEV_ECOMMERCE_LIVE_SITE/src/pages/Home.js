import React from "react";
import FeaturedProduct from "../Components/FeaturedProduct";
import HeroSection from "../Components/HeroSection";

const Home = () => {
  return (
    <>
      <HeroSection title="Amazon Store" text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus corrupti quae praesentium aliquam, voluptatum alias voluptates, placeat suscipit, provident accusantium ullam molestias eos impedit officiis et eveniet? Expedita nulla veritatis assumenda consequatur consequuntur eaque perferendis odio quasi." />
      <div className="space">
        <FeaturedProduct />
      </div>
    </>
  );
};

export default Home;
