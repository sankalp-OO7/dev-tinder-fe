import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice/authSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants.jsx";
import { Navigate, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Signup from "./SignUp.jsx";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("4@1.com");
  const [password, setPassword] = useState("redapple");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth.user);
  console.log(auth);
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    login();
  };

  async function login() {
    try {
      const res = await axios.post(
        BASE_URL + "/auth/login",
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("Login successful:", res.data);
      navigate("/feed");
      dispatch(loginSuccess(res.data.userdata));
    } catch (err) {
      setError("Login failed. " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col align-middle items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      {isLogin ? (
        <form onSubmit={handleLogin}>
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
                "Login"
              )}
            </button>
          </div>
        </form>
      ) : (
        <Signup />
      )}
      <p
        onClick={() => setIsLogin(!isLogin)}
        className="cursor-pointer text-2xl mt-2 text-white"
      >
        {isLogin ? "new to website SignUP" : "Allredy have accound Log In"}
      </p>
    </div>
  );
}
