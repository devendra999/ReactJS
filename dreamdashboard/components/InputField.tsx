import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
// import { useForm } from 'react-hook-form';
// import { useRegister } from '../pages/Login';
// import { useRegister } from './RegisterContext';

const InputField = (props: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [localHelperText, setLocalHelperText] = useState<string | null>(null);

  // Handle props updates and set local helper text
  useEffect(() => {
    if (props.helperText !== undefined) {
      setLocalHelperText(props.helperText);
    }
  }, [props.helperText]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (event: any) => {
    const { name, value } = event.target;

    if (props.maxLength && value.length > props.maxLength) {
      setLocalHelperText(
        `Entered value should not have more than ${props.maxLength} characters`
      );
    } else {
      setLocalHelperText(null);
    }

    if (event) {
      props.handleChange?.({ [name]: value });
    }
  };

  return (
    <>
      <Box className="form-control">
        {props.labelname ? (
          <label className="form-custom-label">{props.labelname}</label>
        ) : (
          ""
        )}

        <TextField
          name={props.name}
          hiddenLabel
          id={props.idtextfield}
          placeholder={props.placeholder ? props.placeholder : "placeholder"}
          defaultValue={props.defaultValue}
          variant={props.variant ? props.variant : "standard"}
          className={props.className}
          onChange={handleInput}
          type={
            props.type && props.type === "password"
              ? showPassword
                ? "text"
                : "password"
              : props.type
          }
          helperText={localHelperText}
          error={localHelperText != null}
          InputProps={{
            endAdornment:
              props.type === "password" ? (
                <InputAdornment position="end" className="button-fix-position">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ) : null,
          }}
        />
      </Box>
    </>
  );
};

export default InputField;

