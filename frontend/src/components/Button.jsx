import { Pencil } from "lucide-react";
import { useState } from "react";
import EditNoteForm from "./EditNoteForm";
import { useNavigate } from "react-router";
const Button = ({ noteId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toNoteDetail = useNavigate();

  const toggleComponents = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleComponents} className="btn btn-success">
        {isOpen ? toNoteDetail(`note/${noteId}`) : <Pencil />}
      </button>
    </div>
  );
};

export default Button;
