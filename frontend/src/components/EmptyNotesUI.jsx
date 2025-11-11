import { StickyNoteIcon } from "lucide-react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router";

const EmptyNotesUI = () => {
  const createPage = useNavigate();
  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center h-screen">
        <div className="card bg-base-200 shadow-md w-1/2 border border-base-300">
          <div className="card-body items-center text-center">
            <StickyNoteIcon className="size-20 text-primary mb-4" />
            <h2 className="card-title">No Notes Yet</h2>
            <p className="text-base-content/80">
              You haven't created any notes. Start by adding your first one!
            </p>
            <div className="mt-4">
              <button
                onClick={() => createPage("/create")}
                className="btn btn-primary"
              >
                Create Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyNotesUI;
