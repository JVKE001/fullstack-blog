import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth"; // adjust the path if needed
import toast from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      {/* Left - Brand */}
      <div className="navbar-start">
        <NavLink
          to="/"
          className="text-xl font-bold text-primary hover:text-secondary"
        >
          Blog App
        </NavLink>
      </div>

      {/* Center - Navigation Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/" className="hover:text-primary">
              Home
            </NavLink>
          </li>
          {auth?.user && (
            <>
              <li>
                <NavLink to="/create-post" className="hover:text-primary">
                  Create Post
                </NavLink>
              </li>
              <li>
                <NavLink to="/myposts" className="hover:text-primary">
                  My Posts
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Right - Auth Buttons */}
      <div className="navbar-end gap-2">
        {!auth?.user ? (
          <>
            <NavLink to="/login" className="btn btn-sm btn-outline btn-primary">
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-sm btn-primary">
              Register
            </NavLink>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">
              {auth.user.username}
            </span>
            <button onClick={handleLogout} className="btn btn-sm btn-outline">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
