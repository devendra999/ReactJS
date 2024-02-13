"use client";
import Carausel from "@/components/Carausel";
import FeaturedProduct from "@/components/FeaturedProduct";
import HeroSection from "@/components/HeroSection";
import useStore from "@/store/productStore";
import { useEffect } from "react";

export default function Home() {
  const { featuredProducts, products, getProducts } = useStore();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <HeroSection
        title="Amazon Store"
        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus corrupti quae praesentium aliquam, voluptatum alias voluptates, placeat suscipit, provident accusantium ullam molestias eos impedit officiis et eveniet? Expedita nulla veritatis assumenda consequatur consequuntur eaque perferendis odio quasi."
      />
      <p>
        973887848835<br></br> boapp1689b
      </p>
      <FeaturedProduct featuredProducts={featuredProducts} />
      <Carausel />
    </>
  );
}
