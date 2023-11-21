import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import InputField from "./InputField";

const Header = ({ props }) => {
  console.log(props);
  return (
    <>
      <Box className="header">
        <Box className="container">
          <Box className="d-flex">
            <h2>USERS</h2>
            {/* <InputField /> */}
            <Link to="/add">
              <Button variant="outlined">
                <AddIcon /> User
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Header;
