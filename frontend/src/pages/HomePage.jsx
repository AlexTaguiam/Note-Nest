import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect, useState } from "react";
import LoadingUI from "../components/LoadingUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import EditNoteForm from "../components/EditNoteForm";
import EmptyNotesUI from "../components/EmptyNotesUI";
import api from "../lib/axios";
import { useNotesContext } from "../hooks/useNotesContext";
function HomePage() {
  const { notes, dispatch, isLoading, isRateLimited } = useNotesContext();

  useEffect(() => {
    const fetchNotes = async () => {
      dispatch({ type: "FETCH_NOTES_START" });
      try {
        const res = await api.get("/notes");
        dispatch({ type: "FETCH_NOTES_SUCCESS", payload: res.data });
        // console.log(res.data);
      } catch (error) {
        console.error("error in fetching Notes", error);

        if (error.response?.status === 429) {
          dispatch({ type: "RATE_LIMITED" });
        } else {
          dispatch({ type: "FETCH_NOTES_ERROR" });
          toast.error("Failed to Load notes");
        }
      }
    };
    fetchNotes();
  }, []);

  if (notes?.length === 0) {
    return <EmptyNotesUI />;
  }

  return (
    <>
      <NavBar />
      {isLoading && <LoadingUI />}
      {isRateLimited && <RateLimitedUI />}

      <NoteCard
        notes={notes}
        // onButtonClick={() => setTriggerRender((prev) => !prev)}
      />

      {false && <EditNoteForm />}
    </>
  );
}

export default HomePage;
