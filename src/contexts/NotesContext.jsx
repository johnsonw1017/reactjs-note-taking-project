import { createContext, useContext, useReducer } from "react";

const initialNotesData = [
    {
        id: 1,
        title: "Welcome to thr Note Taker!",
        description: "Make your notes here!",
        isCompleted: false,
        dueDate: new Date.setDate(new Date().getDate() + 1), // Current time but one day in the future
        createdAtDate: Date.now()
    }
]

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
