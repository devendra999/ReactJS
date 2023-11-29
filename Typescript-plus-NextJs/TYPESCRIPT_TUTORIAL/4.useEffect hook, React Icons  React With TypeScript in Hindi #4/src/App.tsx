import './App.css';
import Note from './components/note/note';
import { Notes } from './components/note/data';
import AddNote from './components/add-note/add-note';
import { useState } from 'react';
import { NoteType } from './components/note/note-type';

function App() {
  const [notes, setNotes] = useState(Notes);
  const [editMode, setEditMode] = useState(false);
  const [noteToBeEditted, setNoteToBeEditted] = useState<NoteType | null>(null);

  const addNote = (note: NoteType) => {
    setNotes([note, ...notes]);
  };

  const updateNote = (updatedNote: NoteType) => {
    const index = notes.findIndex((note) => note.id === updatedNote.id);
    let editedNotes = [...notes];
    editedNotes.splice(index, 1, updatedNote);
    setNotes(editedNotes);
    setEditMode(false);
  };

  const editNote = (id: string) => {
    console.log('edit', id);
    const note = notes.find((note) => note.id === id);
    setEditMode(true);
    if (note) {
      setNoteToBeEditted(note);
    }
  };

  const deleteNote = (id: string) => {
    const index = notes.findIndex((note) => note.id === id);
    let editedNotes = [...notes];
    editedNotes.splice(index, 1);
    setNotes(editedNotes);
  };
  return (
    <div className="App">
      <h2>Notes App</h2>
      <AddNote
        addNote={addNote}
        editMode={editMode}
        noteToBeEditted={noteToBeEditted}
        updateNote={updateNote}
      ></AddNote>
      <div>
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            priority={note.priority}
            text={note.text}
            editNote={editNote}
            deleteNote={deleteNote}
          ></Note>
        ))}
      </div>
    </div>
  );
}

export default App;
