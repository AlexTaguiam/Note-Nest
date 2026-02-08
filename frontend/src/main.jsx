import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { NotesContextProvider } from "./context/NotesContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <NotesContextProvider>
        <App />
        <Toaster />
      </NotesContextProvider>
    </AuthProvider>
  </StrictMode>,
);
