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
