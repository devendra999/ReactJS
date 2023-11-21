import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../actions/userAction";
import { Box, FormControl, InputLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import UserItem from "../components/UserItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loader = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  const [itemsPerPage, setItemsPerPage] = useState(6);

  const handleChangeItemsPerPage = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset page when changing items per page
  };

  // Pagination
  // const itemsPerPage = 6;
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(users.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <>
      {loader ? (
        <Box className="load_page">
          <img src="assets/loading.gif" alt="loading" />
        </Box>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <Box className="container">
            <Grid container spacing={2}>
              {console.log(users)}
              {users && Array.isArray(users) && users.length > 0 ? (
                users.slice((page - 1) * itemsPerPage, page * itemsPerPage)
                  .length > 0 ? (
                  users
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((user, index) => (
                      <Grid key={index} item xs={4}>
                        <Item>
                          <UserItem user={user} />
                        </Item>
                      </Grid>
                    ))
                ) : (
                  setPage(page - 1)
                )
              ) : (
                <p>No users available.</p>
              )}
            </Grid>

            <Stack direction="row" spacing={2} sx={{ marginTop: "3rem" }}>
              <FormControl style={{ minWidth: "5rem" }} size="small">
                <InputLabel id="demo-simple-select-label">Per Page</InputLabel>
                <Select
                  value={itemsPerPage}
                  onChange={handleChangeItemsPerPage}
                  label="Per Page"
                >
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={18}>18</MenuItem>
                  <MenuItem value={24}>24</MenuItem>
                  {/* Add more options as needed */}
                </Select>
              </FormControl>
              <Pagination
                count={pageCount}
                page={page}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </Box>
        </>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Users;
