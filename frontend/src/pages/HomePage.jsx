import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingUI from "../components/LoadingUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import EditNoteForm from "../components/EditNoteForm";
import EmptyNotesUI from "../components/EmptyNotesUI";
import api from "../lib/axios";
import { useNotesContext } from "../hooks/useNotesContext";
function HomePage() {
  const { notes, dispatch } = useNotesContext();

  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [triggerRender, setTriggerRender] = useState(false);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        dispatch({ type: "GET_NOTES", payload: res.data });
        console.log(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("error in fetching Notes", error);

        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to Load notes");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [triggerRender]);

  if (notes.length === 0) {
    return <EmptyNotesUI />;
  }

  return (
    <>
      <NavBar />
      {isLoading && <LoadingUI />}
      {isRateLimited && <RateLimitedUI />}

      <NoteCard
        notes={notes}
        onButtonClick={() => setTriggerRender((prev) => !prev)}
      />

      {false && <EditNoteForm />}
    </>
  );
}

export default HomePage;
