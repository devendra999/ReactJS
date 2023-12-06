"use client";
import React from "react";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AddUserProps {
  id?: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  website: string;
}

const AddUser: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserProps>();
  const onSubmit: SubmitHandler<AddUserProps> = async (data) => {
    data.id = new Date().getTime();
    try {
      await axios.post("http://localhost:3004/users", data, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } catch (error) {
      console.log(error);
    }
    router.push("/");
  };

  return (
    <>
      <Box className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              {...register("name", { required: true })}
              fullWidth
            />
            {errors.name && <span>This field is required</span>}
          </Box>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            {...register("username")}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            {...register("email")}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            {...register("phone")}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Website"
            variant="outlined"
            {...register("website")}
            fullWidth
          />
          <Box>
            <Button type="submit" variant="contained">
              Add User
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddUser;
