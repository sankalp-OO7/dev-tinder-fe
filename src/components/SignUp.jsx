import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice/authSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants.jsx";
import { Navigate, useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function Signup() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth.user);
  console.log(auth);
  const handleSignIN = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    signin();
  };

  async function signin() {
    try {
      const res = await axios.post(
        BASE_URL + "/auth/signup",
        {
          email,
          password,
          gender,
          name,
          role,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Login successful:", res.data);
      dispatch(loginSuccess(res.data.userdata));
      navigate("/feed");
    } catch (err) {
      setError("Login failed. " + err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <form onSubmit={handleSignIN}>
        <div className="block max-w-sm mt-16 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Login to Your Account
          </h5>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter your email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              value={email}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter your name"
              required
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              value={name}
            />
          </div>
          <label
            htmlFor="gender"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Gender
          </label>
          <select
            id="gender"
            required
            onChange={(e) => setGender(e.target.value)}
            class="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
          >
            <option selected>Choose a Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter your password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              value={password}
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex justify-center items-center gap-2 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "SignUp"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
