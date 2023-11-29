import { useContext, useEffect, useState } from 'react';
import { NoteType, Priority } from '../note/note-type';
import './add-note.css';
import { v4 as uuidv4 } from 'uuid';
import Card from '../card/card';
import { ThemeContext } from '../../context/theme/theme';
import { StateContext } from '../../context/state/state';
import { ADD_NOTE, UPDATE_NOTE, SET_EDIT_MODE } from '../../actions';

type AddNoteProps = {};

function AddNote(props: AddNoteProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('low');
  const theme = useContext(ThemeContext);
  const { state, dispatch } = useContext(StateContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const setNoteContent = (note: NoteType) => {
    setText(note.text);
    setPriority(note.priority);
  };

  useEffect(() => {
    if (state.noteToBeEdited && state.editMode) {
      setNoteContent(state.noteToBeEdited);
    }
  }, [state.noteToBeEdited, state.editMode]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (state.editMode) {
      state.noteToBeEdited &&
        dispatch({
          type: UPDATE_NOTE,
          payload: {
            text,
            priority,
            id: state.noteToBeEdited.id,
          },
        });
      dispatch({ type: SET_EDIT_MODE, payload: false });
    } else {
      dispatch({
        type: ADD_NOTE,
        payload: {
          text,
          priority,
          id: uuidv4(),
        },
      });
    }

    setText('');
    setPriority('low');
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as Priority);
  };

  return (
    <Card bgColor={theme === 'dark' ? '#333' : '#ddd'} height="2" padding="1">
      <form className="add-note">
        <input type="text" onChange={handleChange} value={text} />
        <select onChange={handleSelect} value={priority}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={handleClick}>{state.editMode ? 'Edit' : 'Add'}</button>
      </form>
    </Card>
  );
}

export default AddNote;
