import React, { useEffect, useState } from "react";
import { useNoteData, useNoteDispatch } from "../contexts/NotesContext";

export default function NoteForm(props){

    const {id} = props;
    const globalNotesData = useNoteData();
    const globalNotesDispatch = useNoteDispatch();

    const [localTitle, setLocalTitle] = useState("");
    const [localDescription, setLocalDescription] = useState("");
    const [localIsCompleted, setLocalIsCompleted] = useState(false);
    const [localDueDate, setLocalDueDate] = useState(new Date().setDate(new Date().getDate() + 1));
    const [localCreatedAtDate, setLocalCreatedAtDate] = useState(Date.now())
    
    //finding a note if there is one, then prefill the form with existing data
    useEffect(() => {
        let tempNote = globalNotesData.find(globalSpecificNote => {
            return globalSpecificNote.id === id;
        });

        if (tempNote){
            setLocalTitle(tempNote.title);
            setLocalDescription(tempNote.description);
            setLocalIsCompleted(tempNote.isCompleted);
            setLocalDueDate(tempNote.dueDate);
            setLocalCreatedAtDate(tempNote.createdAtDate);
        }


    }, [globalNotesData, id])

    const saveNoteToGlobal = () => {
        let tempNewNote = {
            id: id || globalNotesData.length + 1,
            title: localTitle,
            description: localDescription,
            isCompleted: localIsCompleted,
            dueDate: localDueDate,
            createdAtDate:localCreatedAtDate
        }

        if(id){
            globalNotesDispatch({type:"update", updatedNote: tempNewNote});
        } else {
            globalNotesDispatch({type:"create", newNote: tempNewNote});
        }
        
    }
    

    return(
        <div>
            <form>
            <label>Title:</label>
            <input type="text" name="title" value={localTitle} onChange={(event) => setLocalTitle(event.target.value)}/>
            <label>Description:</label>
            <input type="text" name="description" value={localDescription} onChange={(event) => setLocalDescription(event.target.value)}/>
            <label>Is Completed:</label>
            <input type="checkbox" name="isCompleted" value={localIsCompleted} checked={localIsCompleted} onChange={(event) => setLocalIsCompleted(!localIsCompleted)}/>
            <label>Due Date:</label>
            <input type="date" name="dueDate" value={new Date(localDueDate).toISOString().split("T")[0]} onChange={(event) => setLocalDueDate(event.target.value)}/>
            </form>
        <button onClick={saveNoteToGlobal}>Save Note</button>
        </div>
    )
}