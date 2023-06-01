import React from "react";
import { useNoteData } from "../contexts/NotesContext"


export default function Homepage(props){

    const globalNotesData = useNoteData();
    // const [someData, someFunction] = useContext(SomeContext);

    return(
        <div>
            <h1>Note Taking Application</h1>

            {/* Note Count Component */}
            <h3>We have {globalNotesData.length} notes in storage!</h3>

            {/* Note Form Component */}

            {/* List Of All Notes Component */}
            <h3>List of All Notes:</h3>
            {globalNotesData.map((note) => {
                return(
                <div key={note.id}>
                    <h4>{note.title}</h4>
                    <p>{note.description}</p>
                    <p>{note.isCompleted ? "COMPLETE" : "NOT YET DONE"}</p>
                    <input type="checkbox" disabled="disabled" value={note.isCompleted}/>
                    <h5>Due Date: {new Date(note.dueDate).toLocaleDateString()}</h5>
                    <h5>Created At: {new Date(note.createdAtDate).toLocaleDateString()}</h5>
                </div>
                )
            })}
        </div>
    )
}