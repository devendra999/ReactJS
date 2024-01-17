import React from "react";
import { useFilterContext } from "../context/FilterContext";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";

const Sort = () => {
  const { gridView, setGridView, setListView, sorting, filterProducts } =
    useFilterContext();
  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="sort_btn">
        <button
          onClick={setGridView}
          className={gridView ? "active button-grid" : "button-grid"}
        >
          <GridViewOutlinedIcon />
        </button>
        <button
          onClick={setListView}
          className={!gridView ? "active button-grid" : "button-grid"}
        >
          <DnsOutlinedIcon />
        </button>
      </div>
      <div className="products_total">
        <b
          style={{
            fontSize: "1.5rem",
            fontWeight: "200",
          }}
        >
          {filterProducts.length} Products
        </b>
      </div>
      <div className="sorting_value">
        <select
          id="sort"
          name="sort"
          onChange={sorting}
          className="form-control"
        >
          <option value="lowest">Price (Lowest)</option>
          <option value="highest">Price (Highest)</option>
          <option value="a-z">Name (a-z)</option>
          <option value="z-a">Name (z-a)</option>
        </select>
      </div>
    </div>
  );
};

export default Sort;
