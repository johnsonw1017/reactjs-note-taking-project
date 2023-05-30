import React from "react";
import { createContext, useContext, useReducer } from "react";

const initialNotesData = [
    {
        id: 1,
        title: "Welcome to thr Note Taker!",
        description: "Make your notes here!",
        isCompleted: false,
        dueDate: new Date().setDate(new Date().getDate() + 1), // Current time but one day in the future
        createdAtDate: Date.now()
    }
]

/**
 * 
 * @param {*} previousState 
 * @param {*} instructions .type determines how we edit the state
 * @returns New state based on instructions provided
 */
const notesReducer = (previousState, instructions) => {
    let stateEditable = [...previousState];

    switch (instructions.type) {
        case "create":
            console.log("TODO: Create note and add to state");
            break;
        case "update":
            console.log("TODO: Update specific note and overwrite it in state");
            break;
        case "sortByDueDate":
            console.log("TODO: Sorted state data by due date");
            break;
        case "sortByCreatedAtDate":
            console.log("TODO: Sorted bt created at date");
            break;
        case "sortById":
            console.log("TODO: Sorted by ID, this is the default order");
            break;
        default:
            console.log("Invalid instruction type provided, it was: " + instructions.type);
            return previousState
    }
}

// how to make reducer state and dispatch global
export const NoteDataContext = createContext(null);
export const NoteDispatchContext = createContext(null);

// Custom hooks provides direct access to one part of the reducer
export function useNoteData(){
    return useContext(NoteDataContext);
}

export function useNoteDispatch(){
    return useContext(NoteDispatchContext);
}

/**
 * NotesProvider wraps around the component tree.
 * Any child component has access to this not data via useNoteData and useNoteDispatch
 * @param {*} props props.children should should be a JSX element. This NotesProvider wraps around that element.
 */
export default function NotesProvider(props){

    //    [readOnlyData, functionToModifyData] = userReducer(functionToModifyData, initialDefaultData)
    const [notesData, notesDispatch] = useReducer(notesReducer, initialNotesData);

    return (
        <NoteDataContext.Provider value ={notesData}>
            <NoteDispatchContext.Provider value={notesDispatch}>
                {props.children}
            </NoteDispatchContext.Provider>
        </NoteDataContext.Provider>
    )
}