import { Trash2Icon } from "lucide-react";

const DeleteConfirmationUI = ({ onCancel, onConfirm, isDeleteLoading }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card bg-base-100 shadow-lg w-1/3 border border-error">
        <div className="card-body items-center text-center">
          <Trash2Icon className="size-16 text-error mb-4" />
          <h2 className="card-title text-error">Confirm Deletion</h2>
          <p className="text-base-content/80">
            Are you sure you want to delete this note? this action cannot be
            undone
          </p>
          <div className="mt-6 flex gap-4">
            <button className="btn btn-outline" onClick={onCancel}>
              Cancel
            </button>
            <button
              className="btn btn-error"
              disabled={isDeleteLoading}
              onClick={onConfirm}
            >
              {isDeleteLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationUI;
