import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const CreateNote = () => {
  const backToHome = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newNote = {
        title: title,
        content: content,
      };

      const response = await axios.post(
        "http://localhost:5001/api/notes",
        newNote
      );

      console.log("Data posted successfully", response.data);
      toast.success("Form submitted");
      setTitle("");
      setContent("");
      backToHome("/");
    } catch (error) {
      console.error("Error in the submit function", error);
      toast.error("Failed to Submit");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex h-screen justify-center items-center px-4">
      <div className=" p-10 rounded-2xl shadow-lg w-full max-w-xl bg-primary-content">
        <div className="mb-6">
          <button
            onClick={() => backToHome("/")}
            className="btn btn-error w-full text-lg"
          >
            Back to Notes
          </button>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-lg font-semibold mb-2">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter your title"
              required
              className="input input-bordered w-full text-base p-4"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note content..."
              required
              className="textarea textarea-bordered w-full text-base p-4 min-h-[150px]"
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="btn btn-success text-lg px-8 py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
