import React, { useEffect } from "react";
import { createContext, useContext, useReducer } from "react";
import { useLocalStorage } from "react-use";

const initialNotesData = [
    {
        _id: 1,
        title: "Welcome to the Note Taker!",
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
        case "setup":
            console.log("Apply persistent data to state")
            //provided when dispatch function is called
            stateEditable = instructions.data;
            // returns new value of state
            return stateEditable

        case "create":
            console.log("TODO: Create note and add to state");

            let newNote = instructions.newNote;
            stateEditable.push(newNote);

            return stateEditable

        case "update":
            console.log("TODO: Update specific note and overwrite it in state");

            // Find the existing note, overwrite it and return it

            let targetNoteIndex = stateEditable.findIndex(globalSpecificNote =>{
                return globalSpecificNote.id === instructions.updatedNote.id;
            });

            stateEditable[targetNoteIndex] = instructions.updatedNote;
            return stateEditable
            
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

    //                                                          keyInLocalStorage, defaultDataIfKeyIsNotFound
    const [persistentData, setPersistentData] = useLocalStorage('notes', initialNotesData);

    useEffect(() => {
        notesDispatch({type: "setup", data: persistentData});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log("Local Storage: " + persistentData);
    }, [persistentData]);

    // Autosave any changes to notes from reducer state into local storage
    useEffect(() => {
        setPersistentData(notesData);
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notesData]);

    return (
        <NoteDataContext.Provider value ={notesData}>
            <NoteDispatchContext.Provider value={notesDispatch}>
                {props.children}
            </NoteDispatchContext.Provider>
        </NoteDataContext.Provider>
    )
}