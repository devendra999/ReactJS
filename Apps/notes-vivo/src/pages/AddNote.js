import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useNotesContext } from "../context/notesContext";
import moment from "moment";

const AddNote = () => {
  const { addNote } = useNotesContext();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.id = new Date().getTime();
    data.time = new Date().getTime();
    data.date = new Date().toISOString();
    data.character = count;
    console.log(data);
    addNote(data);
    navigate(`/`);
  };

  const characterCount = (e) => {
    let value = e.target.value;
    let countText = value.split(" ").join("").length;
    setCount(countText);
  };

  const formattedDate = moment(new Date()).format("LLLL");

  return (
    <>
      <Box className="mb-2">
        <Link to="/" className=" d-flex align-items-center">
          <ArrowBackIcon /> <span>Add new note</span>
        </Link>
      </Box>

      <Box className="text mb-2">
        {formattedDate} | <span style={{ color: "#ee5959" }}>{count}</span>{" "}
        character
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="mb-2">
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            {...register("title")}
          />
        </Box>
        <Box className="mb-2">
          <TextField
            fullWidth
            label="Description"
            {...register("description")}
            multiline
            rows={10}
            onChange={(e) => characterCount(e)}
            // defaultValue="Default Value"
          />
        </Box>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </form>
    </>
  );
};

export default AddNote;
