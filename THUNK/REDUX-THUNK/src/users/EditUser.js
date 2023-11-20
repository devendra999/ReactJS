import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm, useWatch } from "react-hook-form";
import { editUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);

  console.log(user);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const userWatch = watch();

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(editUser(data));
    reset();
    navigate("/");
  };

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {user && (
          <Box>
            <h2>Edit User {user?.name}</h2>
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
        )}
      </form>
      <DevTool control={control} />
    </>
  );
};

export default EditUser;
