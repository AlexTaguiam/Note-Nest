import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuthContext";

const NavBar = () => {
  const createPage = useNavigate();
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    createPage("/");
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
              NoteNest
            </h1>
          </div>
          <div>
            <button
              onClick={() => createPage("/create")}
              className="btn btn-primary"
            >
              <PlusIcon />
              Add new Note
            </button>
          </div>
          <div>
            <button onClick={handleLogout} className="btn btn-ghost">
              Log out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
