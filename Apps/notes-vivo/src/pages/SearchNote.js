import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import { useNotesContext } from "../context/notesContext";
import moment from "moment";

const SearchNote = () => {
  const {
    filter: { text },
    notes,
    searchNote,
    clearSearchNote,
  } = useNotesContext();

  const filterNote = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(text.toLowerCase()) ||
      note.description.toLowerCase().includes(text.toLowerCase())
    );
  });

  console.log(filterNote);

  return (
    <>
      <Box className="search-note d-flex align-items-center mb-2">
        <Link to="/">
          <ArrowBackIcon />
        </Link>
        <TextField
          fullWidth
          value={text}
          label="Search for notes"
          variant="outlined"
          onChange={(e) => searchNote(e)}
        />
        <Button onClick={clearSearchNote}>
          <ClearIcon />
        </Button>
      </Box>

      <Box className="list_of_notes">
        {text.length > 0 && filterNote.length > 0 ? (
          filterNote.map((note) => (
            <Box
              key={note.id}
              className="singleNote d-flex align-items-center full"
            >
              <Box className="content">
                <Link to={`/edit/${note?.id}`}>
                  <Typography variant="h6" gutterBottom>
                    {note?.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    className="oneline_eclipse"
                  >
                    {note?.description}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    {moment(note?.date).format("MMMM Do")}
                  </Typography>
                </Link>
              </Box>
            </Box>
          ))
        ) : (
          <Box className="notfound text-center">
            {text.length > 0 ? "No notes found" : ""}
          </Box>
        )}
      </Box>
    </>
  );
};

export default SearchNote;
