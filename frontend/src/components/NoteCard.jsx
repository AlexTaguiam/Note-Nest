import axios from "axios";
import { Pencil, Trash2, XIcon } from "lucide-react";
import EditNoteForm from "./EditNoteForm";
import { useNavigate } from "react-router";
import Button from "./Button";
import { useState } from "react";
import toast from "react-hot-toast";
import DeleteConfirmationUI from "./DeleteConfirmationUI";

const NoteCard = ({ notes = [], onButtonClick, setNotes }) => {
  const toNoteDetail = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [noteId, setNoteId] = useState("");
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleDelete = async (noteId) => {
    try {
      setIsDeleteLoading(true);
      const response = await axios.delete(
        `http://localhost:5001/api/notes/${noteId}`
      );
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
      console.log(`Note with ID ${noteId} deleted successfully`, response.data);
      toast.success("Note Deleted Successfully");
      onButtonClick();
    } catch (error) {
      toast.error("Failed Deleting Note");
      console.log("Error in handleDelete function", error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  if (isDeleting) {
    return (
      <DeleteConfirmationUI
        onCancel={() => setIsDeleting(false)}
        onConfirm={() => handleDelete(noteId)}
        isDeleteLoading={isDeleteLoading}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {notes.map((note) => {
        return (
          <div key={note._id} className="card bg-base-200 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">{note.title}</h2>
              <p>{note.content}</p>
              <div className="flex justify-between pt-5">
                <div className="flex justify-center items-center">
                  {new Date(note.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

                <div className="justify-end card-actions">
                  <button
                    className="btn btn-warning"
                    onClick={() => toNoteDetail(`note/${note._id}`)}
                  >
                    <Pencil />
                  </button>
                  <button
                    onClick={() => {
                      setNoteId(note._id);
                      setIsDeleting(true);
                    }}
                    className="btn btn-error"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NoteCard;
