import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface EditablePageType {
  text?: string;
  defaultValue?: string;
  onSubmit: (data: string) => void;
}

const Editable = ({ text, defaultValue, onSubmit }: EditablePageType) => {
  const [isEdit, setisEdit] = useState(false);
  const [inputText, setinputText] = useState(defaultValue ? defaultValue : "");

  const submission = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      onSubmit(inputText);
      setinputText("");
    }
    setisEdit(false);
  };

  return (
    <>
      {isEdit ? (
        <form className="form" onSubmit={submission}>
          <TextField
            fullWidth
            style={{ marginBottom: "0.5rem" }}
            label={text}
            value={inputText}
            onChange={(e) => setinputText(e.target.value)}
            size="small"
            variant="outlined"
          />
          <Button type="submit" size="small" variant="contained">
            Add
          </Button>
          <Button size="small" onClick={() => setisEdit(false)}>
            <CloseIcon />
          </Button>
        </form>
      ) : (
        <span onClick={() => setisEdit(true)} className="value-edit">
          {defaultValue ? defaultValue : text}
        </span>
      )}
    </>
  );
};

export default Editable;
