import React from "react";
import { useFilterContext } from "../context/FilterContext";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

const FilterProduct = () => {
  const {
    updateFilter,
    clearFilter,
    allProducts,
    filters: { text, category, company, colors, price, maxPrice },
  } = useFilterContext();

  console.log(colors);

  const getUniqueData = (products, attr) => {
    let uniqueValue = products.map((prod) => prod[attr]);
    if (attr === "colors") {
      uniqueValue = uniqueValue.flat();
    }
    uniqueValue = ["all", ...new Set(uniqueValue)];

    return uniqueValue;
  };

  const categoryData = getUniqueData(allProducts, "category");
  const companyData = getUniqueData(allProducts, "company");
  const colorsData = getUniqueData(allProducts, "colors");

  // console.log(colorsData);

  return (
    <div>
      <div className="mb-5">
        <input
          className="form-control"
          onChange={updateFilter}
          type="text"
          name="text"
          value={text}
          placeholder="search"
        />
      </div>
      <div className="mb-5">
        <h5 className="subtitle">Category</h5>
        <ul className="category">
          {categoryData &&
            categoryData.map((cat, index) => {
              return (
                <li key={index} className={cat === category ? "active" : ""}>
                  <button onClick={updateFilter} name="category" value={cat}>
                    {cat}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="mb-5">
        <h5 className="subtitle">Company</h5>
        <select
          id="company"
          className="form-control"
          name="company"
          onChange={updateFilter}
        >
          {companyData &&
            companyData.map((comp, index) => {
              return (
                <option key={index} value={comp}>
                  {comp}
                </option>
              );
            })}
        </select>
      </div>

      <div className="mb-5">
        <h5 className="subtitle">Colors</h5>
        <ul className="colors">
          {colorsData &&
            colorsData.length > 0 &&
            colorsData.map((color, index) => {
              if (color === "all") {
                return (
                  <button
                    name="colors"
                    value={color}
                    style={{ backgroundColor: "transparent", border: "0" }}
                    onClick={updateFilter}
                  >
                    All
                  </button>
                );
              }

              return (
                <li key={index}>
                  <button
                    name="colors"
                    value={color}
                    style={{ backgroundColor: color }}
                    onClick={updateFilter}
                  >
                    {color === colors && (
                      <CheckOutlinedIcon style={{ color: "#fff" }} />
                    )}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>

      <div className="mb-5">
        <h5 className="subtitle">Price</h5>
        <h6
          style={{
            fontSize: "1rem",
            fontWeight: "200",
            marginBottom: "0.5rem",
          }}
        >
          {price}
        </h6>
        <input
          className="w-100"
          type="range"
          min={0}
          max={maxPrice}
          name="price"
          value={price}
          onChange={updateFilter}
        />
      </div>

      <div>
        <button className="danger button" onClick={clearFilter}>
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default FilterProduct;
