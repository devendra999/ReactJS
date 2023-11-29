import './note.css';

import { Color, Priority } from './note-type';
import Card from '../card/card';
import { FaTrash, FaEdit } from 'react-icons/fa';

type NoteProps = {
  id: string;
  text: string;
  priority?: Priority;
  editNote: (id: string) => void;
  deleteNote: (id: string) => void;
};

function Note(props: NoteProps) {
  return (
    <Card
      bgColor={props.priority && Color[props.priority]}
      height="2"
      padding="1"
    >
      <>
        <div>{props.text}</div>
        <div className="right-corner">
          <FaEdit onClick={() => props.editNote(props.id)}></FaEdit>
          <FaTrash onClick={() => props.deleteNote(props.id)}></FaTrash>
        </div>
      </>
    </Card>
  );
}

export default Note;
