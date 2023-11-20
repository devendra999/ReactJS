import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { getUser, editUser, removeUser } from "../actions/userActions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const UserItem = ({ user }) => {
  const dispatch = useDispatch();
  const { name, username, email, phone, website, id } = user;
  return (
    <>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {phone}
            </Typography>
            <Typography variant="h5" component="div">
              {name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {username}
              <br></br>
              {website}
            </Typography>
            <Typography variant="body2">{email}</Typography>
          </CardContent>
          <CardActions>
            <Link to={`/view/${id}`}>
              <Button size="small" onClick={() => dispatch(getUser(id))}>
                View
              </Button>
            </Link>
            <Link to={`/edit/${id}`}>
              <Button size="small" onClick={() => dispatch(getUser(id))}>
                Edit
              </Button>
            </Link>
            <Button size="small" onClick={() => dispatch(removeUser(id))}>
              Remove
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default UserItem;
