import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/notesReducer";

const notesContext = createContext();

const getNotes = () => {
  let note = localStorage.getItem("Notes");
  if (note) {
    return JSON.parse(note);
  } else {
    return [];
  }
};

const getTheme = () => {
  let thememode = localStorage.getItem("ThemeMode");
  return JSON.parse(thememode);
};

const initialState = {
  // notes: [],
  // theme: false,
  notes: getNotes(),
  theme: getTheme(),
  filter: {
    text: "",
  },
};

const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addNote = (note) => {
    dispatch({ type: "ADD_NOTE", payload: note });
  };

  const editNote = (note) => {
    dispatch({ type: "EDIT_NOTE", payload: note });
  };

  const searchNote = (e) => {
    let value = e.target.value;
    dispatch({ type: "SEARCH_NOTE", payload: value });
  };

  const clearSearchNote = () => {
    dispatch({ type: "CLEAR_SEARCH_NOTE" });
  };

  const handleRemoveSelected = (ids) => {
    console.log(ids);
    dispatch({ type: "REMOVE_SELECTED", payload: ids });
  };

  const themeHandler = () => {
    dispatch({ type: "SET_THEME" });
  };

  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(state.notes));
  }, [state.notes]);

  useEffect(() => {
    localStorage.setItem("ThemeMode", state.theme);
  }, [state.theme]);

  return (
    <notesContext.Provider
      value={{
        ...state,
        addNote,
        editNote,
        searchNote,
        clearSearchNote,
        handleRemoveSelected,
        themeHandler,
      }}
    >
      {children}
    </notesContext.Provider>
  );
};

// custom hooks
const useNotesContext = () => {
  return useContext(notesContext);
};

export { NotesProvider, notesContext, useNotesContext };
