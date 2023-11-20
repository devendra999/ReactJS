import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../actions/userActions";
import UserItem from "./UserItem";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Box, Container } from "@mui/material";
import { BsAlexa, BsFillInfoCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const error = useSelector((state) => state.users.error);
  const loading = useSelector((state) => state.users.loading);
  // console.log(error);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <>
      <Link to="/add">New User</Link>
      <Box style={{ padding: "50px", position: "relative" }}>
        <Grid container spacing={2}>
          {error ? (
            <>
              <BsFillInfoCircleFill
                style={{ fontSize: "20px", color: "blue" }}
              />
              <span> Something went wrong</span>
            </>
          ) : loading ? (
            <BsAlexa style={{ fontSize: "60px", color: "red" }} />
          ) : (
            users &&
            users.length > 0 &&
            users.map((user) => <UserItem key={user.id} user={user} />)
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Users;
