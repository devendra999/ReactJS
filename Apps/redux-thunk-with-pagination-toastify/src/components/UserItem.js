import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser, getUsers, removeUser } from "../actions/userAction";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserItem = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const deleteUser = (id) => {
    dispatch(removeUser(id));
    setTimeout(() => {
      dispatch(getUsers());
    }, 500);
    toast.error("Removed user Successfully");
    handleClose();
  };

  return (
    <>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {user.username}
        </Typography>
        <Typography variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {user.phone}
        </Typography>
        <Typography variant="body2">{user.email}</Typography>
      </CardContent>
      <CardActions>
        <Link style={{ marginRight: "10px" }} to={`/view/${user.id}`}>
          <Button
            className="customBtn info"
            size="small"
            variant="contained"
            onClick={() => dispatch(getUser(user.id))}
          >
            <RemoveRedEyeIcon />
          </Button>
        </Link>
        <Link
          style={{ marginRight: "10px", marginLeft: 0 }}
          to={`/edit/${user.id}`}
        >
          <Button
            className="customBtn success"
            size="small"
            variant="contained"
            onClick={() => dispatch(getUser(user.id))}
          >
            <EditIcon />
          </Button>
        </Link>
        <Button
          className="customBtn danger"
          size="small"
          variant="contained"
          onClick={handleOpen}
        >
          <DeleteOutlineIcon />
        </Button>
      </CardActions>

      {/* modal */}
      <Modal
        open={open}
        // onClose={handleClose}
        className="customModal"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete {user.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete it ?
          </Typography>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              onClick={() => deleteUser(user.id)}
            >
              Yes
            </Button>
            <Button size="small" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </CardActions>
        </Box>
      </Modal>
    </>
  );
};

export default UserItem;
