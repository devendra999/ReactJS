import './App.css';
import Note from './components/note/note';
import { Notes } from './components/note/data';
import AddNote from './components/add-note/add-note';
import { useState } from 'react';
import { NoteType } from './components/note/note-type';

function App() {

  const [notes, setNotes] = useState(Notes);

  const addNote = (note:NoteType)=>{
    setNotes([note,...notes])
  }
  return (
    <div className="App">
      <h2>Notes App</h2>
      <AddNote addNote={addNote}></AddNote>
      <div>
        {
          notes.map(
            note=> <Note key={note.id} priority={note.priority} text={note.text}></Note>
          )
        }
      </div>
    </div>
  );
}

export default App;
