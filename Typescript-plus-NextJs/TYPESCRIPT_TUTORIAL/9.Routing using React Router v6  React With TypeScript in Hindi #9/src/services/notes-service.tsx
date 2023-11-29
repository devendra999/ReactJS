import { NoteType } from '../components/note/note-type';

export async function getNotes() {
  const response = await fetch('/notes?_sort=updatedAt&_order=desc'); 
  const notes =await response.json();
  return notes.map((note:NoteType)=>
  ({...note,createdAt:new Date(note.createdAt),updatedAt:new Date(note.updatedAt)}))

}
export async function addNote(note: NoteType) {
  const response = await fetch('/notes', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  const noteFromDB =  await response.json();
  return {...noteFromDB,
    createdAt:new Date(noteFromDB.createdAt),
    updatedAt:new Date(noteFromDB.updatedAt)}
}
export async function deleteNote(id: string) {
  const response = await fetch(`/notes/${id}`, {
    method: 'delete',
  });
  return await response.json();
}
export async function updateNote(id: string, note: NoteType) {
  const response = await fetch(`/notes/${id}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  const noteFromDB =  await response.json();
  return {...noteFromDB,
    createdAt:new Date(noteFromDB.createdAt),
    updatedAt:new Date(noteFromDB.updatedAt)}
}
