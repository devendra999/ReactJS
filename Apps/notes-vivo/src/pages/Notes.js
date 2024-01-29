import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Title from "../components/Title";
import { useState } from "react";
import { Box, Checkbox, Typography } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import ContrastIcon from "@mui/icons-material/Contrast";
import { Link } from "react-router-dom";
import { useNotesContext } from "../context/notesContext";
import moment from "moment";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Notes = () => {
  const { notes, handleRemoveSelected, themeHandler, theme } =
    useNotesContext();
  const [checkOption, setCheckOption] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  // individual checked handler
  const handleCheckboxChange = (id) => {
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];

    setSelectedIds(newSelectedIds);
  };

  // all checked handler
  const handleCheckAllChange = () => {
    const allIds = notes.map((note) => note.id);
    setSelectedIds(selectedIds.length === allIds.length ? [] : allIds);
  };

  return (
    <>
      <Box className="d-flex align-items-center justify-content-between">
        {checkOption ? (
          <Box>
            <Button
              variant="text"
              onClick={() => {
                setCheckOption(false);
                setSelectedIds([]);
              }}
            >
              <ClearIcon /> {`${selectedIds.length} selected`}
            </Button>
          </Box>
        ) : (
          <Title text="Notes" />
        )}

        <Box className="btn-group">
          {!checkOption ? (
            <>
              {theme ? (
                <Button variant="text" onClick={() => themeHandler()}>
                  <ContrastIcon />
                </Button>
              ) : (
                <Button variant="text" onClick={() => themeHandler()}>
                  <ContrastIcon />
                </Button>
              )}
              <Button variant="text" onClick={() => setCheckOption(true)}>
                <CheckBoxOutlinedIcon />
              </Button>
            </>
          ) : (
            <Checkbox
              {...label}
              checked={selectedIds.length === notes.length}
              onChange={handleCheckAllChange}
            />
          )}
          {!checkOption ? (
            <Link to="/search-note">
              <Button variant="text">
                <SearchOutlinedIcon />
              </Button>
            </Link>
          ) : (
            <Button
              disabled={selectedIds.length < 1}
              variant="text"
              onClick={() => {
                handleRemoveSelected(selectedIds);
                setSelectedIds([]);
                setCheckOption(false);
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </Button>
          )}
        </Box>
      </Box>
      {notes && notes.length > 0 ? (
        <div className="list_of_notes">
          {notes.map((note) => (
            // <NoteItem key={note.id} {...note} checkOption={checkOption} />

            <Box
              key={note?.id}
              className={
                !checkOption
                  ? "singleNote d-flex align-items-center full"
                  : "singleNote d-flex align-items-center"
              }
            >
              {checkOption && (
                <Checkbox
                  {...label}
                  checked={selectedIds.includes(note?.id)}
                  onChange={() => handleCheckboxChange(note?.id)}
                />
              )}
              <Box
                className="content"
                onClick={() => handleCheckboxChange(note?.id)}
              >
                {!checkOption ? (
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
                ) : (
                  <>
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
                  </>
                )}
              </Box>
            </Box>
          ))}
        </div>
      ) : (
        <Box className="notfound text-center">No notes available</Box>
      )}
      <Link to="/add-note">
        <Button variant="contained" className="add_btn">
          <AddOutlinedIcon />
        </Button>
      </Link>
    </>
  );
};

export default Notes;
