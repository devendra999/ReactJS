import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useForm } from "react-hook-form";
import { addUser } from "../actions/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(addUser(data));
    reset();
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <h2>Add User</h2>
          <TextField
            {...register("name")}
            label="Outlined"
            variant="outlined"
          />
          <TextField
            {...register("username")}
            label="Outlined"
            variant="outlined"
          />
          <TextField
            {...register("email")}
            label="Outlined"
            variant="outlined"
          />
          <TextField
            {...register("phone")}
            label="Outlined"
            variant="outlined"
          />
          <TextField
            {...register("website")}
            label="Outlined"
            variant="outlined"
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AddUser;
