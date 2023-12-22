import React from "react";
import { LabelTypes } from "../app/page";

import Chip from "@mui/material/Chip";

interface Label {
  label: LabelTypes;
}

const Label = ({ label }: Label) => {
  return (
    // <div className="single-label" style={{ backgroundColor: label.color }}>
    //   {label.text}
    //   </div>

    <Chip
      className="single-label"
      style={{ backgroundColor: label.color }}
      label={label.text}
    />
  );
};

export default Label;
