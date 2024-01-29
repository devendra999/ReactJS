import { Typography } from "@mui/material";
import React from "react";

const Title = ({ text }) => {
  return (
    <Typography variant="h4" gutterBottom>
      {text}
    </Typography>
  );
};

export default Title;
