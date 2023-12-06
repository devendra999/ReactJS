"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

const User = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("user");

  const [userView, setUserView] = useState<UserProps>();

  const getUser = async () => {
    try {
      const res = await axios.get<UserProps>(
        `http://localhost:3004/users/${search}`
      );
      const data = res.data;
      setUserView(data);
    } catch (error) {
      console.error(`Error fatch user: ${error}`);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Box className="container">
        <Card>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              ID : {userView?.id}
            </Typography>
            <Typography variant="h5" component="div">
              Name : {userView?.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Username : {userView?.username}
            </Typography>
            <Typography variant="body2">
              Email : {userView?.email}
              <br />
              Phone : {userView?.phone}
              <br />
              Website : {userView?.website}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default User;
