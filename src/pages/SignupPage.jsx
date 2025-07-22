import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!email || !password || !role) {
        ErrorToast("Email, password, and role are required!");
        return;
      }

      const dataObj = {
        email,
        password,
        role,
      };

      const result = await axiosInstance.post("/auth/signup", dataObj);

      if (result.status === 201) {
        SuccessToast(result.data.message);
        navigate("/login");
      } else {
        ErrorToast(result.data.message);
      }
    } catch (err) {
      ErrorToast(
        `Cannot signup: ${err.response?.data?.message || err.message}`
      );
    }
  };

  return (
    <div className="min-h-[100vh] p-4 flex items-center justify-center">
      <div className="p-6 flex flex-col items-start gap-4 bg-emerald-200 rounded-lg">
        <div className="flex gap-4 items-center">
          <label className="text-gray-700" htmlFor="user-email">
            Email:
          </label>
          <input
            id="user-email"
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-1 rounded-md py-1 px-2 text-indigo-700"
          />
        </div>

        <div className="flex gap-4 items-center">
          <label className="text-gray-700" htmlFor="user-password">
            Password:
          </label>
          <input
            id="user-password"
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-1 rounded-md py-1 px-2 text-indigo-700"
          />
        </div>

        <div className="flex gap-4 items-center">
          <label className="text-gray-700" htmlFor="user-role">
            Role:
          </label>
          <select
            id="user-role"
            name="role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border-1 rounded-md py-1 px-2 text-indigo-700"
          >
            <option value="">-- Select Role --</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex flex-col gap-3 items-center self-stretch">
          <button
            className="border-1 py-1 px-2 rounded-lg text-xl bg-green-700 text-white cursor-pointer"
            onClick={handleRegister}
          >
            Register
          </button>
          <p className="flex flex-col gap-2 items-center justify-center">
            <span>Already have an account?</span>
            <Link to="/login" className="text-blue-600 underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { SignupPage };
