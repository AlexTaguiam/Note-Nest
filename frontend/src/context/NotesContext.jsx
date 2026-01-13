import { createContext, useReducer } from "react";

export const NotesContext = createContext();

export const notesReducer = (state, action) => {
  switch (action.type) {
    case "GET_NOTES":
      return {
        ...state,
        notes: action.payload,
        isRateLimited: false,
        isLoading: false,
      };
    case "ADD_NOTE":
      return {
        notes: [...state.notes, action.payload],
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
