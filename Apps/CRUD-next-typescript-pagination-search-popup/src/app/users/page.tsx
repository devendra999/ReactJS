"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

// notification
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// icons
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import Modal from "@/components/Modal";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// api
const API = "https://api.escuelajs.co/api/v1/users";

// user types
interface UserTypes {
  id?: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  creationAt?: string;
  updatedAt?: string;
}

const AllUsers = () => {
  const dispatch = useDispatch();
  const filterUsers = useSelector((state) => state.user.filterUsers);
  const singleUser = useSelector((state) => state.user.singleUser);
  const [searchText, setSearchText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState();

  // modal
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 180,
      renderCell: (params) => (
        <>
          {params.value ? (
            <img
              src={params.value}
              alt="Avatar"
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <span>No Avatar</span>
          )}
        </>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            className="btn mr-2"
            variant="contained"
            color="secondary"
            onClick={() => editUser(params.id)}
          >
            <ModeEditOutlineOutlinedIcon />
          </Button>
          <Button
            className="btn mr-2"
            onClick={() => viewUser(params.id)}
            variant="contained"
            color="success"
          >
            <VisibilityOutlinedIcon />
          </Button>
          <Button
            className="btn"
            onClick={() => deleteUser(params.id)}
            variant="contained"
            color="error"
          >
            <DeleteOutlinedIcon />
          </Button>
        </>
      ),
    },
  ];

  // get all users function
  const getUsers = async (url: string) => {
    try {
      const res = await axios.get(url);
      // console.log(res)
      if (res.status === 200) {
        dispatch({ type: "GET_ALL_USERS", payload: res?.data });
      }
    } catch (error) {
      // console.log(error)
      dispatch({ type: "GET_USER_ERROR", payload: (error as Error)?.message });
    }
  };

  // get single user function
  const getSingleUser = async (id) => {
    try {
      const res = await axios.get(`${API}/${id}`);
      // console.log(res, 'single user')
      if (res.status === 200) {
        dispatch({ type: "GET_SINGLE_USERS", payload: res?.data });
      }
    } catch (error) {
      dispatch({
        type: "GET_SINGLE_USER_ERROR",
        payload: (error as Error)?.message,
      });
    }
  };

  // edit user
  const editUser = (id) => {
    setEditID(id);
    setIsEdit(true);
    getSingleUser(id);
    setCreateModalOpen(true);
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (isEdit && editID) {
      try {
        const res = await axios.put(`${API}/${editID}`, data);
        if (res.status === 200) {
          getUsers(API);
          setCreateModalOpen(false);
          setIsEdit(false);
          setEditID(undefined);
          toast.success("User updated successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        dispatch({
          type: "UPDATE_USER_ERROR",
          payload: (error as Error)?.message,
        });
        toast.error(`${error?.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      data.id = new Date().getTime();
      try {
        const res = await axios.post(API, data);
        if (res.status === 201) {
          const isRegistered = filterUsers.some(
            (user) => user.email === data?.email
          );
          if (isRegistered) {
            toast.error("Email already registerd", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            getUsers(API);
            setCreateModalOpen(false);
            dispatch({ type: "CREATE_USER", payload: res?.data });
            toast.success("User created successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      } catch (error) {
        dispatch({
          type: "CREATE_USER_ERROR",
          payload: (error as Error)?.message,
        });
        toast.error(`${error?.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  useEffect(() => {
    if (singleUser && isEdit) {
      reset(singleUser);
    } else if (!isEdit) {
      reset({
        name: "",
        email: "",
        role: "",
        password: "",
        avatar: "",
      });
    }
  }, [singleUser, isEdit, reset]);

  // for delete modal
  const deleteUser = (id) => {
    getSingleUser(id);
    setRemoveModalOpen(true);
  };

  // for remove user
  const removeUser = async (id) => {
    try {
      const res = await axios.delete(`${API}/${id}`);
      if (res?.status === 200) {
        getUsers(API);
        // dispatch({ type: "REMOVE_USER", payload: id });
        toast.success("User removed successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      dispatch({
        type: "REMOVE_USER_ERROR",
        payload: (error as Error)?.message,
      });
      toast.error(`${error?.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    }
    setRemoveModalOpen(false);
  };

  // view user
  const viewUser = (id) => {
    getSingleUser(id);
    setViewModalOpen(true);
  };

  // search user setText
  const searchUser = (e) => {
    setSearchText(e.target.value);
  };

  // get all useres
  useEffect(() => {
    getUsers(API);
  }, []);

  // search users
  useEffect(() => {
    dispatch({ type: "SEARCH_USER", payload: searchText });
  }, [searchText]);

  if(filterUsers.length === 0) {
    return <h1>Loading.....</h1>
  }

  return (
    <>
      <Box className="container">
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          style={{ marginBottom: "2rem", marginTop: "2rem" }}
        >
          <TextField
            id="outlined-basic"
            label="Search User"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={(e) => searchUser(e)}
          />
          <Button
            variant="contained"
            color="success"
            onClick={() => setCreateModalOpen(true)}
          >
            <AddOutlinedIcon /> User
          </Button>
        </Stack>

        <DataGrid
          rows={filterUsers}
          columns={columns}
          getRowId={(user) => user?.id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20]}
          // checkboxSelection
          autoHeight
        />
      </Box>
      {/* remove user */}
      {removeModalOpen && (
        <Modal>
          <button
            className="close-button btn"
            onClick={() => setRemoveModalOpen(false)}
          >
            <CloseOutlinedIcon />
          </button>
          <h2>
            Are you sure remove{" "}
            <span style={{ color: "#f00" }}>{singleUser?.name}</span> ?
          </h2>
          <Stack direction="row" spacing={2} style={{ marginTop: "2rem" }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => removeUser(singleUser?.id)}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setRemoveModalOpen(false)}
            >
              No
            </Button>
          </Stack>
        </Modal>
      )}
      {/* View User */}
      {viewModalOpen && (
        <Modal>
          <Button
            className="btn close-button"
            variant="contained"
            color="error"
            onClick={() => {
              setViewModalOpen(false);
              dispatch({ type: "NULL_SINGLE_USERS" });
            }}
          >
            <CloseOutlinedIcon />
          </Button>
          <h2 style={{ marginBottom: "2rem" }}>
            View <span style={{ color: "#2e7d32" }}>{singleUser?.name}</span>
          </h2>

          <Box>
            <Card>
              <CardMedia
                sx={{ height: 250 }}
                image={singleUser?.avatar}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  Name: {singleUser?.name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Email: {singleUser?.email}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Role: {singleUser?.role}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Password: {singleUser?.password}
                </Typography>
                <Divider style={{ margin: "1.5rem 0" }} />
                <Typography variant="body2" color="text.secondary">
                  Create: {singleUser?.creationAt}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last Update: {singleUser?.updatedAt}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Modal>
      )}
      {/* View User */}
      {createModalOpen && (
        <Modal>
          <Button
            className="btn close-button"
            variant="contained"
            color="error"
            onClick={() => {
              setCreateModalOpen(false);
              setIsEdit(false);
              dispatch({ type: "NULL_SINGLE_USERS" });
            }}
          >
            <CloseOutlinedIcon />
          </Button>
          <h2 style={{ marginBottom: "2rem" }}>
            {isEdit ? "Edit user" : "Create User"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
              <Stack
                direction="row"
                spacing={2}
                useFlexGap
                flexWrap="wrap"
                style={{ width: "100%" }}
              >
                <Box className="w-50">
                  <Controller
                    name="name"
                    control={control}
                    rules={{
                      required: "This field is required",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters long",
                      },
                      maxLength: {
                        value: 20,
                        message: "Name cannot be longer than 20 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: "Numbers are not allowed",
                      },
                    }}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Name"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                  {errors.name && (
                    <span className="error">{errors.name.message}</span>
                  )}
                </Box>
                <Box className="w-50">
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "This field is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Email is not valid",
                      },
                    }}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                  {errors.email && (
                    <span className="error">{errors.email.message}</span>
                  )}
                </Box>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                useFlexGap
                flexWrap="wrap"
                style={{ width: "100%" }}
              >
                <Box className="w-50">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Controller
                      name="role"
                      control={control}
                      rules={{ required: "This field is required" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="demo-simple-select-label"
                          label="Role"
                        >
                          <MenuItem disabled value="">
                            Select Role
                          </MenuItem>
                          <MenuItem value="customer">Customer</MenuItem>
                          <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                  {errors.role?.type === "required" && (
                    <span className="error">This field is required</span>
                  )}
                </Box>
                <Box className="w-50">
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "This field is required",
                      pattern: {
                        value: /^(?=.*\d)[A-Za-z\d]{4,}$/,
                        message:
                          "Passowrd is more than 3 character and one is number, special character not allowed",
                      },
                    }}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Password"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                  {errors.password && (
                    <span className="error">{errors.password.message}</span>
                  )}
                </Box>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                useFlexGap
                flexWrap="wrap"
                style={{ width: "100%" }}
              >
                <Box className="w-full">
                  <Controller
                    name="avatar"
                    control={control}
                    rules={{
                      required: "This field is required",
                      pattern: {
                        value: /^https?:\/\/[^\s$.?#].[^\s]*$/,
                        message:
                          "Avatar must be a URL address start with http:// or https://",
                      },
                    }}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Avatar"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                  {errors.avatar && (
                    <span className="error">{errors.avatar.message}</span>
                  )}
                </Box>
              </Stack>
            </Stack>
            <hr
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                borderColor: "#0000001c",
              }}
            />
            <Button type="submit" variant="contained" color="success">
              {isEdit ? "Update" : "Submit"}
            </Button>
          </form>
        </Modal>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
      />
    </>
  );
};

export default AllUsers;
