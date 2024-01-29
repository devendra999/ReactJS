import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useNotesContext } from "../context/notesContext";
import moment from "moment";

const EditNote = () => {
  const { notes, editNote } = useNotesContext();
  const navigate = useNavigate();

  const { id } = useParams();

  const singleNote = notes.filter((note) => note.id == id);
  const [count, setCount] = useState(singleNote?.[0]?.character);

  const characterCount = (e) => {
    let value = e.target.value;
    let countText = value.split(" ").join("").length;
    setCount(countText);
  };

  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.time = new Date().getTime();
    data.date = new Date().toISOString();
    data.character = count;
    console.log(data);
    editNote(data);
    navigate(`/`);
  };

  useEffect(() => {
    reset(singleNote[0]);
  }, []);

  const formattedDate = moment(new Date()).format("LLLL");

  return (
    <>
      <Box className="mb-2">
        <Link to="/" className=" d-flex align-items-center">
          <ArrowBackIcon /> <span>Edit note</span>
        </Link>
      </Box>
      {/* <Box className="text mb-2">
        {`${moment(singleNote?.[0]?.date).format("LLLL")} | ${
          singleNote?.[0]?.character
        } character`}
      </Box> */}
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
          Update
        </Button>
      </form>
    </>
  );
};

export default EditNote;
