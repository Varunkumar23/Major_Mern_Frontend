import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import { Navbar } from "../components/Navbar";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        ErrorToast("Email & password are required!");
        return;
      }

      setLoading(true);

      const result = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (result.status === 200) {
        SuccessToast(result.data.message);

        const userRole = result.data.data.user.role;

        localStorage.setItem("user", JSON.stringify(result.data.data.user));

        if (userRole === "admin") {
          navigate("/admin");
        } else if (userRole === "user") {
          window.open("/", "_self");
        } else {
          ErrorToast("Invalid role received from server!");
        }
      } else {
        ErrorToast(result.data.message);
      }
    } catch (err) {
      ErrorToast(`Cannot login: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          Login
        </h2>

        <div className="mb-4">
          <label
            htmlFor="user-email"
            className="block text-gray-700 mb-1 text-lg"
          >
            Email:
          </label>
          <input
            id="user-email"
            type="email"
            name="email"
            autoComplete="off"
            aria-label="Email input"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-indigo-700"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="user-password"
            className="block text-gray-700 mb-1 text-lg"
          >
            Password:
          </label>
          <input
            id="user-password"
            type="password"
            name="password"
            autoComplete="off"
            aria-label="Password input"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-indigo-700"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2 rounded-md text-white text-lg font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-base">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
