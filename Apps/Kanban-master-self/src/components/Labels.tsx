import React from "react";
import { Chip } from "@mui/material";

const Labels = (props) => {
  // console.log(props);
  return (
    <div className="single-label">
      <Chip
        label={props.label?.text}
        style={{ backgroundColor: props.label?.color }}
      />
    </div>
  );
};

export default Labels;
