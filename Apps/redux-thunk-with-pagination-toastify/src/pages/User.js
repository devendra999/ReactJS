import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../actions/userAction";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const singleUser = useSelector((state) => state.users.user);
  const loader = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    dispatch(getUser(id));
  }, []);

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
          <h2 className="title">View {singleUser?.name}</h2>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{singleUser?.name}</td>
              </tr>
              <tr>
                <td>Usernmae</td>
                <td>{singleUser?.username}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{singleUser?.email}</td>
              </tr>
              <tr>
                <td>Website</td>
                <td>{singleUser?.website}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{singleUser?.phone}</td>
              </tr>
              <tr>
                <td>Company</td>
                <td>
                  <b>{singleUser?.company?.name}</b> <br></br>
                  {singleUser?.company?.bs} <br></br>
                  {singleUser?.company?.catchPhrase}
                </td>
              </tr>
              <tr>
                <td>Address</td>
                <td>
                  {singleUser?.address?.street}
                  <br></br>
                  {singleUser?.address?.suite}
                  <br></br>
                  {singleUser?.address?.city}
                  <br></br>
                  {singleUser?.address?.zipcode}
                </td>
              </tr>
            </tbody>
          </table>
          <Box style={{ marginTop: "2rem" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/")}
            >
              <ArrowBackIcon /> Back to all users
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default User;
