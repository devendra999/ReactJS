import { NoteType } from '../components/note/note-type';

export async function getNotes() {
  const response = await fetch('/notes');
  return await response.json();
}
export async function addNote(note: NoteType) {
  const response = await fetch('/notes', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  return await response.json();
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
  return await response.json();
}
