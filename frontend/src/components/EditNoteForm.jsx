import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import RateLimitedUI from "./RateLimitedUI";
import LoadingUI from "./LoadingUI";
import api from "../lib/axios";

function EditNoteForm() {
  const [note, setNote] = useState({ title: "", content: "" });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const backToHome = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        }
        console.error("error in fetching note", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [id]);
  console.log(note.title);
  console.log(note.content);

  const handleEditNote = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);

      if (!note.title.trim() || !note.content.trim()) {
        toast.error("Please add title or content");
        return;
      }

      const newNote = {
        title: note.title,
        content: note.content,
      };

      console.log("Note ID prop:", id);
      const editNote = await api.put(`/notes/${id}`, newNote);

      console.log("Edited successfully", editNote.data);
      toast.success("Edited Successfully");
      backToHome("/");
    } catch (error) {
      console.error("Error in handleEditNote function: ", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    backToHome("/");
  };

  if (isLoading) {
    return <div>{isLoading && <LoadingUI />}</div>;
  }

  if (isRateLimited) {
    return <div> {isRateLimited && <RateLimitedUI />}</div>;
  }

  return (
    <div className="flex min-h-screen justify-center items-center bg-base-100 px-4">
      <div className="relative bg-base-200 p-10 rounded-2xl shadow-lg w-full max-w-4xl mx-auto">
        <div>
          <button className="btn btn-primary" onClick={() => backToHome("/")}>
            Back to Notes
          </button>
        </div>
        <h2 className="text-3xl font-bold mb-8 text-center">Edit Note</h2>

        <form className="flex flex-col gap-6" onSubmit={handleEditNote}>
          <div>
            <label htmlFor="title" className="block text-lg font-semibold mb-2">
              Title
            </label>
            <input
              id="title"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              type="text"
              placeholder="Update your title"
              className="input input-bordered w-full text-base p-4"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-lg font-semibold mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
              placeholder="Update your note content..."
              className="textarea textarea-bordered w-full text-base p-4 min-h-[200px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleCancel}
              type="button"
              className="btn btn-outline text-lg px-6"
            >
              Cancel
            </button>
            <button
              disabled={isSaving}
              type="submit"
              className="btn btn-primary text-lg px-6"
            >
              {isSaving ? "...Saving" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNoteForm;
