import React from "react";

import { useFilterContext } from "../context/FilterContext";
import Product from "../Components/Product";
import FilterProduct from "../Components/FilterProduct";
import Sort from "../Components/Sort";
import ListView from "../Components/ListView";
import GridView from "../Components/GridView";

const Products = () => {
  const { gridView, filterProducts } = useFilterContext();
  // console.log(filterProducts);
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
