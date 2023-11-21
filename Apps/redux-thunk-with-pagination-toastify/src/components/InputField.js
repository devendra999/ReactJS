import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

const InputField = () => {
  const [searchValue, setSearchValue] = useState("");
  const searchText = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("searchValue", searchValue);
  }, [searchValue]);

  return (
    <TextField
      size="small"
      onChange={searchText}
      value={searchValue}
      className="search-area"
      id="outlined-basic"
      label="Search User"
      variant="outlined"
    />
  );
};

export default InputField;
