import { createContext, useReducer } from "react";

export const NotesContext = createContext();

export const notesReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_NOTES_START":
      return {
        ...state,
        isLoading: true,
        isRateLimited: false,
      };
    case "FETCH_NOTES_SUCCESS":
      return {
        ...state,
        notes: action.payload,
        isRateLimited: false,
        isLoading: false,
      };

    case "FETCH_NOTES_ERROR":
      return {
        ...state,
        isLoading: false,
      };

    case "ADD_NOTE":
      return {
        notes: [...state.notes, action.payload],
      };

    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload._id),
      };

    case "RATE_LIMITED":
      return {
        ...state,
        isLoading: false,
        isRateLimited: true,
      };
    default:
      return state;
  }
};

export const NotesContextProvider = ({ children }) => {
  const initialState = {
    notes: [],
    isRateLimited: false,
    isLoading: true,
  };

  const [state, dispatch] = useReducer(notesReducer, initialState);

  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
