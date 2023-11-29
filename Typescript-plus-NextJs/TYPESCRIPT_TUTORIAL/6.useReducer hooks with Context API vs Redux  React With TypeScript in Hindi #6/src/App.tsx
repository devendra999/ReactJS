import './App.css';
import { ThemeContext } from './context/theme/theme';
import Home from './pages/home/home';
import Switch from 'react-switch';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useReducer, useState } from 'react';
import { StateContext, StateType } from './context/state/state';
import { Notes } from './components/note/data';
import { ADD_NOTE, DELETE_NOTE, SET_EDIT_MODE, SET_NOTE_FOR_EDIT, UPDATE_NOTE } from './actions';

function App() {
  const [theme, setTheme] = useState('light');
  const [checked, setChecked] = useState(false);

  const [state, dispatch] = useReducer(
    (state: StateType, action: { type: string; payload: any }) => {
      switch (action.type) {
        case SET_EDIT_MODE:
          return { ...state, editMode: action.payload };
        case SET_NOTE_FOR_EDIT:
          return { ...state, noteToBeEdited: action.payload };
        case ADD_NOTE:
          return { ...state, notes: [action.payload, ...state.notes] };
        case DELETE_NOTE:
          const index = state.notes.findIndex(
            (note) => note.id === action.payload
          );
          let editedNotes = [...state.notes];
          editedNotes.splice(index, 1);
          return { ...state, notes: editedNotes };
        case UPDATE_NOTE:
          const indexUpdated = state.notes.findIndex(
            (note) => note.id === action.payload.id
          );
          let editedNotesUpdated = [...state.notes];
          editedNotesUpdated.splice(indexUpdated, 1, action.payload);
          return { ...state, notes: editedNotesUpdated };
        default:
          return state;
      }
    },
    { notes: Notes, editMode: false, noteToBeEdited: null }
  );

  const changeHandler = (check: boolean) => {
    setChecked(!checked);
    if (check) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ThemeContext.Provider value={theme}>
        <Switch
          onChange={changeHandler}
          checked={checked}
          className="react-switch"
          uncheckedIcon={
            <FaMoon
              size={20}
              style={{ paddingTop: '4px', paddingRight: '4px', float: 'right' }}
              color="white"
            ></FaMoon>
          }
          checkedIcon={
            <FaSun
              size={20}
              style={{ paddingTop: '4px', paddingLeft: '4px' }}
              color="yellow"
            ></FaSun>
          }
          onColor="#900"
          offColor="#333"
          onHandleColor="#000"
        ></Switch>
        <Home></Home>
      </ThemeContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
