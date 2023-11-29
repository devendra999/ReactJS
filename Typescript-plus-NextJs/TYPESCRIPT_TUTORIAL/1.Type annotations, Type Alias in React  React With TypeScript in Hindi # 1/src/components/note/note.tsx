import './notes.css'

import {NoteProps} from './note-type';

function Note(props: NoteProps){
    return (
        <div className={`note ${props.priority}`}>
            {props.text}
        </div>
    )
}


export default Note;