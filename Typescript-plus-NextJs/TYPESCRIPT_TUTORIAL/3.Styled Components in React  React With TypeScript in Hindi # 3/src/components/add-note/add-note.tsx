import { useState } from 'react';
import { NoteType, Priority } from '../note/note-type';
import './add-note.css';
import { v4 as uuidv4 } from 'uuid';
import Card from '../card/card';

type AddNoteProps = {
  addNote : (note: NoteType) => void
}

function AddNote(props: AddNoteProps){

  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>('low');
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
     setText(e.target.value);
  }
 
  const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault();
    props.addNote({
      text,
      priority,
      id: uuidv4()
    })
    setText('')
    setPriority('low')
  }

  const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>)=>{
   setPriority(e.target.value as Priority);
  }

  return(
    <Card bgColor='#333'
    height='2'
    padding='1'>
        <form className="add-note">
            <input type="text" onChange={handleChange} value={text}/>
            <select onChange={handleSelect} value={priority}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button onClick={handleClick}>Add</button>
        </form>
    </Card>
  )
}

export default AddNote;