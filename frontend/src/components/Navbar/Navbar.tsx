import { useState } from "react";
import { Menu, X, Home, Briefcase, LogOut } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    toast.error("User not found. Please log in.");
    navigate("/login"); // Redirect to login page
    return null;
  }

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.clear(); // Clear all localStorage items
    toast.success("Logged out successfully.");
    navigate("/");
  };

  // Helper function to determine if a link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="bg-blue-600 text-white shadow-lg fixed top-0 w-full">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <Briefcase size={28} />
              <span className="text-2xl font-bold">Job Portal</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6">
              <Link
                to="/jobs"
                className={`flex items-center gap-2 px-3 py-1 rounded hover:text-gray-200 ${
                  isActive("/jobs") ? "bg-orange-500" : ""
                }`}
              >
                <Home size={18} /> Home
              </Link>
              <Link
                to="/user/jobs"
                className={`flex items-center gap-2 px-3 py-1 rounded hover:text-gray-200 ${
                  isActive("/user/jobs") ? "bg-orange-500" : ""
                }`}
              >
                <Briefcase size={18} /> My Jobs
              </Link>
              <button className="flex items-center gap-2 px-3 py-1 rounded hover:text-gray-200">
                <a
                  href="http://localhost:8000/admin"
                  className="flex items-center"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LogOut size={18} /> Admin
                </a>
              </button>
              <button
                className="flex items-center gap-2 px-3 py-1 rounded hover:text-gray-200"
                onClick={handleLogout}
              >
                <LogOut size={18} /> Logout
              </button>
            </div>

            {/* User Profile */}
            <div className="hidden md:flex items-center gap-3 cursor-pointer">
              <img
                src={user.avatar || "/default-avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <div>
                <p className="text-sm font-semibold">
                  {user.username.toUpperCase()}
                </p>
                <p className="text-xs text-gray-300">{user.email}</p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={toggleMenu}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden flex flex-col items-center gap-4 py-4 border-t border-gray-300">
              <Link
                to="/jobs"
                className={`flex items-center gap-2 px-3 py-1 rounded ${
                  isActive("/jobs") ? "bg-orange-500" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <Home size={18} /> Home
              </Link>
              <Link
                to="/user/jobs"
                className={`flex items-center gap-2 px-3 py-1 rounded ${
                  isActive("/user/jobs") ? "bg-orange-500" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <Briefcase size={18} /> My Jobs
              </Link>
              <button className="flex items-center gap-2 px-3 py-1 rounded hover:text-gray-200">
                <a
                  href="http://localhost:8000/admin"
                  className="flex items-center"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LogOut size={18} /> Admin
                </a>
              </button>
              <button
                className="flex items-center gap-2 px-3 py-1 rounded text-red-400 hover:text-gray-200"
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Add padding to prevent content from being hidden under fixed navbar */}
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;
