import './note.css';

import { ColorLight, ColorDark, Priority, NoteType } from './note-type';
import Card from '../card/card';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useContext } from 'react';
import { ThemeContext } from '../../context/theme/theme';
import { StateContext } from '../../context/state/state';
import { DELETE_NOTE, SET_EDIT_MODE, SET_NOTE_FOR_EDIT } from '../../actions';
import { deleteNote } from '../../services/notes-service';
import { Link } from 'react-router-dom';

type NoteProps = {
  id: string;
  text: string;
  priority?: Priority;
  createdAt: Date;
  updatedAt: Date;
  note: NoteType;
  isDetailed?: boolean;
  height?: string;
};

function Note(props: NoteProps) {
  const theme = useContext(ThemeContext);
  const { dispatch } = useContext(StateContext);

  const editNote = (note: NoteType) => {
    dispatch({ type: SET_EDIT_MODE, payload: true });
    dispatch({ type: SET_NOTE_FOR_EDIT, payload: note });
  };

  const handleDelete = async () => {
    console.log(await deleteNote(props.id));
    dispatch({ type: DELETE_NOTE, payload: props.id });
  };

  const optionalProps = props.height ? { height: props.height } : {};
  return (
    <Card
      bgColor={
        theme === 'dark'
          ? props.priority && ColorDark[props.priority]
          : props.priority && ColorLight[props.priority]
      }
      padding="1"
      {...optionalProps}
    >
      <>
        {props.isDetailed ? (
          <div className={props.isDetailed ? 'text' : 'text text-hide'}>
            {props.text}
          </div>
        ) : (
          <Link
            to={props.id}
            style={{
              textDecoration: 'none',
              color: `${theme === 'dark' ? 'white' : 'black'}`,
            }}
          >
            <div className={props.isDetailed ? 'text' : 'text text-hide'}>
              {props.text}
            </div>
          </Link>
        )}

        <div className="left-corner date">
          {props.updatedAt.toLocaleString()}
        </div>
        {
          props.isDetailed ? null: <div className="right-corner">
          <FaEdit onClick={() => editNote(props.note)}></FaEdit>
          <FaTrash onClick={handleDelete}></FaTrash>
        </div>
        }
       
      </>
    </Card>
  );
}

export default Note;
