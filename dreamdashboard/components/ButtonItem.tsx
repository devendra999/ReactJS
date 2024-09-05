import React from "react";
import { Button, CircularProgress } from "@mui/material";
function ButtonItem(props: any) {
  return (
    <Button
      type={props.type}
      variant="contained"
      disabled={props.disabled}
      className={`btn ${props.className} ${props.disabled ? 'disabled:opacity-25' : ''}`}
      onClick={props.onClick}
      startIcon={props.startIcon}
    >
      {props.ButtonTitle ? props.ButtonTitle : "ButtonTitle"}{" "}
      {props.loading ? (
        <CircularProgress color="inherit" size={16} />
      ) : (
        ""
      )}
    </Button>
  );
}

export default ButtonItem;
