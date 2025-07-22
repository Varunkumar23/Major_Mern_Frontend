import { Link, useNavigate } from "react-router";
import { useState } from "react";
import useAppContext from "../contexts/useAppContext";
import { axiosInstance } from "../axios/axiosInstance";
import { AppContext } from "../contexts/appContext";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const { user = {}, setUser, count, setSearchQuery } = useAppContext();
  const { isAuthenticated } = user;
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleSearch = () => {
    setSearchQuery(input.trim());
    setInput("");
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      setUser({ isAuthenticated: false, email: null, _id: null });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-gray-400 shadow-md px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-1">
        <img
          src={logo}
          alt="Elevate Mart Logo"
          className="h-16 w-16 object-contain rounded-full"
        />
        <div className="text-2xl font-bold text-gray-800 tracking-wide">
          Elevate
        </div>
        <div className="text-2xl font-bold text-zinc-100 tracking-wide">
          Mart
        </div>
      </div>

      <div className="flex items-center w-1/3">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded-l-md border border-black  text-black"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button
          className="px-4 py-2 bg-black text-white rounded-r-md hover:bg-yellow-700 transition mx-1.5 rounded-2xl"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="flex gap-6 items-center text-md text-gray-800 font-medium">
        <Link to="/" className="hover:text-yellow-700 transition">
          Home
        </Link>
        <div className="flex items-center gap-x-2">
          <Link to="/cart" className="hover:text-yellow-700 transition">
            Cart
          </Link>
          <div className="bg-black text-white w-6 h-6 px-2 rounded-full flex items-center justify-center">
            {count}
          </div>
        </div>

        <Link to="/aboutus" className="hover:text-yellow-700 transition">
          About Us
        </Link>

        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="hover:text-yellow-700 transition underline"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="hover:text-yellow-700 transition underline"
            >
              Signup
            </Link>
            <div className="bg-black rounded-full h-10 w-10"></div>
          </>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
            <p className="text-sm text-gray-700 italic">{user?.email}</p>
          </>
        )}
      </div>
    </nav>
  );
};

export { Navbar };
