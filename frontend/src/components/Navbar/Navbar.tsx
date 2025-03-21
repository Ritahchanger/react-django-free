import { useState } from "react";
import { Menu, X, Home, Briefcase, User, LogOut } from "lucide-react";

import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = {
    name: "Ritah Changer",
    email: "ritahchanger@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="bg-blue-600 text-white shadow-lg fixed top-0 w-[100%] right-0 left-0">
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
                className="flex items-center gap-2 hover:text-gray-200"
              >
                <Home size={18} />
                Home
              </Link>
              <Link
                to="/user/jobs"
                className="flex items-center gap-2 hover:text-gray-200"
              >
                <Briefcase size={18} />
                My Jobs
              </Link>
              <a
                href="/profile"
                className="flex items-center gap-2 hover:text-gray-200"
              >
                <User size={18} />
                Profile
              </a>
              <Link
                to="/"
                className="flex items-center gap-2 hover:text-gray-200"
              >
                <LogOut size={18} />
                Logout
              </Link>
            </div>

            {/* User Profile Dropdown */}
            <div className="hidden md:flex items-center gap-3 cursor-pointer">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <div>
                <p className="text-sm font-semibold">{user.name}</p>
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
              <Link to="/jobs" className="flex items-center gap-2">
                <Home size={18} />
                Home
              </Link>
              <Link to="/user/jobs" className="flex items-center gap-2">
                <Briefcase size={18} />
                My Jobs
              </Link>
              <a href="/profile" className="flex items-center gap-2">
                <User size={18} />
                Profile
              </a>
              <Link to="/" className="flex items-center gap-2 text-red-400">
                <LogOut size={18} />
                Logout
              </Link>
            </div>
          )}
        </div>
      </nav>
      <p
        style={{
          paddingTop: "40px",
        }}
      ></p>
    </>
  );
};

export default Navbar;
