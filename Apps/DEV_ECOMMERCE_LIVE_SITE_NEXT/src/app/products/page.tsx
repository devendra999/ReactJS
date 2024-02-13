"use client";

import FilterProduct from "@/components/FilterProduct";
import GridView from "@/components/GridView";
import ListView from "@/components/ListView";
import Sort from "@/components/Sort";
import useStore from "@/store/productStore";
import { useEffect } from "react";

const Products = () => {
  const { gridView, filterProducts, getProducts } = useStore();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="space">
      <div className="container">
        <div className="row flex-wrap">
          <div className="left col">
            <FilterProduct />
          </div>
          <div className="right col">
            <div className="sort shadow p-5 border-radius mb-5">
              <Sort />
            </div>
            <div className="row">
              {gridView ? (
                <GridView product={filterProducts} />
              ) : (
                <ListView product={filterProducts} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
