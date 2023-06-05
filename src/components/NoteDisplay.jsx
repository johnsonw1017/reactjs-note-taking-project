import React, { useEffect, useState } from "react"
import { useNoteData } from "../contexts/NotesContext";

export default function NoteDisplay(props){

    const {id} = props;
    const [localNote, setLocalNote] = useState({});

    const globalNotesData = useNoteData();

    useEffect(() => {
        //on start, find the note in globalNotesData
        // that has an ID matching props.id
        setLocalNote(globalNotesData.find(globalSpecificNote => {
            return globalSpecificNote.id === id
        }));
    }, [globalNotesData, id])

    return(
        <div>
            <h4>{localNote.title}</h4>
            <p>{localNote.description}</p>
            <p>{localNote.isCompleted ? "COMPLETE" : "NOT YET DONE"}</p>
            <input type="checkbox" disabled="disabled" value={Boolean(localNote.isCompleted)}/>
            <h5>Due Date: {new Date(localNote.dueDate).toLocaleDateString()}</h5>
            <h5>Created At: {new Date(localNote.createdAtDate).toLocaleDateString()}</h5>
        </div>
    )
}