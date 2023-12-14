import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { X } from "react-feather";

const CardEdit = (props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [inputText, setInputText] = useState(props.defaultValue || "");
  console.log(props, inputText, "dddddddddd");

  const submission = (e) => {
    e.preventDefault();
    if (inputText && props.onSubmit) {
      props.onSubmit(inputText);
      setInputText("");
    }
    setIsEditable(false);
  };

  return (
    <>
      {isEditable ? (
        <div className="edit-input">
          <form onSubmit={submission}>
            <TextField
              style={{ marginBottom: "0.5rem" }}
              size="small"
              type="text"
              variant="outlined"
              autoFocus
              fullWidth
              defaultValue={inputText}
              value={inputText}
              label={props.placeholder || props.text}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Button type="submit" variant="contained" size="small">
              {props.buttonText || "Add"}
            </Button>
            <Button
              size="small"
              onClick={() => {
                setIsEditable(false);
              }}
            >
              <X />
            </Button>
          </form>
        </div>
      ) : (
        <p onClick={() => setIsEditable(true)}>{props.text}</p>
      )}
    </>
  );
};

export default CardEdit;
