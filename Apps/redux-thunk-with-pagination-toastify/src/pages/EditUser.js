import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editUser, getUser } from "../actions/userAction";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const singleUser = useSelector((state) => state.users.user);
  const loader = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    dispatch(getUser(id));
  }, []);

  useEffect(() => {
    reset(singleUser);
  }, [singleUser, dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(editUser(data));
    reset();
    toast.success("User updated Successfully");
    navigate("/");
  };

  return (
    <>
      {loader ? (
        <Box className="load_page">
          <img src="../assets/loading.gif" alt="loading" />
        </Box>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <Box className="container">
          <h2 className="title">Edit User : {singleUser.name}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  {...register("name", { required: true })}
                  type="text"
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  {...register("username")}
                  type="text"
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  {...register("email")}
                  type="email"
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  {...register("phone")}
                  type="number"
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  {...register("website")}
                  type="text"
                  id="outlined-basic"
                  label="Website"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <h5>Company Details :</h5>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  {...register("company.name")}
                  type="text"
                  id="outlined-basic"
                  label="Company Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  {...register("company.bs")}
                  type="text"
                  id="outlined-basic"
                  label="Comapny Tagline"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  {...register("company.catchPhrase")}
                  type="text"
                  id="outlined-basic"
                  label="Company Information"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <h5>Address Details :</h5>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  {...register("address.suite")}
                  type="text"
                  id="outlined-basic"
                  label="Suite"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  {...register("address.street")}
                  type="text"
                  id="outlined-basic"
                  label="Street"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  {...register("address.city")}
                  type="text"
                  id="outlined-basic"
                  label="City"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  {...register("address.zipcode")}
                  type="number"
                  id="outlined-basic"
                  label="Zipcode"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" size="large">
                  Update user
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/")}
                >
                  <ArrowBackIcon /> Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      )}
    </>
  );
};

export default EditUser;
