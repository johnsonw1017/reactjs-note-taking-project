import React, { useState } from "react";

export default function NoteForm(prop){

    const [localTitle, setLocalTitle] = useState("");
    const [localDescription, setLocalDescription] = useState("");
    const [localIsCompleted, setLocalIsCompleted] = useState(false);
    const [localDueDate, setLocalDueDate] = useState(new Date().setDate(new Date().getDate() + 1));
    

    return(
        <div>
            <form>
            <label>Title:</label>
            <input type="text" name="title" value={localTitle} onChange={setLocalTitle}/>
            <label>Description:</label>
            <input type="text" name="description" value={localDescription} onChange={setLocalDescription}/>
            <label>Is Completed:</label>
            <input type="text" name="title" value={localIsCompleted} onChange={setLocalIsCompleted}/>
            <label>Due Date:</label>
            <input type="text" name="dueDate" value={localDueDate} onChange={setLocalDueDate}/>
            </form>
        <button>Save Note</button>
        </div>
    )
}