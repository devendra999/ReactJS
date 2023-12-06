"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

const EditUser = () => {
  const searchParams = useSearchParams();
  const edit = searchParams.get("edit");

  const router = useRouter();

  const [userView, setUserView] = useState<UserProps>();

  const getUser = async () => {
    try {
      const res = await axios.get<UserProps>(
        `http://localhost:3004/users/${edit}`
      );
      const data = res.data;
      setUserView(data);
    } catch (error) {
      console.error(`Error fatch user: ${error}`);
    }
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProps>();

  const onSubmit: SubmitHandler<UserProps> = async (data) => {
    try {
      const response = await axios.put<UserProps>(
        `http://localhost:3004/users/${edit}`,
        data,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
    } catch (error) {
      console.log("Error:", error); // Log any errors
    }
    router.push("/");
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userView) {
      reset(userView);
    }
  }, [userView, reset]);

  return (
    <>
      <Box className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <TextField
              id="outlined-basic"
              label="Name"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              {...register("name", { required: true })}
              fullWidth
            />
            {errors.name && <span>This field is required</span>}
          </Box>
          <TextField
            id="outlined-basic"
            InputLabelProps={{ shrink: true }}
            label="Username"
            variant="outlined"
            {...register("username")}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Email"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            {...register("email")}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            InputLabelProps={{ shrink: true }}
            label="Phone"
            variant="outlined"
            {...register("phone")}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Website"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            {...register("website")}
            fullWidth
          />
          <Box>
            <Button type="submit" variant="contained">
              Edit User
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default EditUser;
