import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddNote from "./pages/AddNote";
import Notes from "./pages/Notes";
import { Box } from "@mui/material";
import SearchNote from "./pages/SearchNote";
import EditNote from "./pages/EditNote";
import { useNotesContext } from "./context/notesContext";
import { useEffect } from "react";

function App() {
  const { theme } = useNotesContext();

  useEffect(() => {
    document.body.className = theme ? "dark" : "";
  }, [theme]);

  return (
    <Box className="main_notes">
      <Box className="contgainer">
        <Router>
          <Routes>
            <Route path="/" element={<Notes />} />
            <Route path="/add-note" element={<AddNote />} />
            <Route path="/edit/:id" element={<EditNote />} />
            <Route path="/search-note" element={<SearchNote />} />
          </Routes>
        </Router>
      </Box>
    </Box>
  );
}

export default App;
