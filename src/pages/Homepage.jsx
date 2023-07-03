import React, { useEffect } from "react";
import { useNoteData, useNoteDispatch } from "../contexts/NotesContext";
import NoteParent from "../components/NoteParent";
import NoteForm from "../components/NoteForm";
import { getNotes } from "../services/notesServices";


export default function Homepage(props){

    const globalNotesData = useNoteData();
    // dispatch is our reducer for editing global notes state
    const globalNotesDispatch = useNoteDispatch();

    useEffect(() => {
        getNotes().then(data => globalNotesDispatch({type:"setup", data: data}))
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div>
            <h1>Note Taking Application</h1>

            {/* Note Count Component */}
            <h3>We have {globalNotesData.length} notes in storage!</h3>
            <NoteForm />

            {/* List Of All Notes Component */}
            <h3>List of All Notes:</h3>
            {globalNotesData.map((note) => {
                return(
                <div key={note._id}>
                    <NoteParent _id={note._id}/>
                </div>
                )
            })}
        </div>
    )
}