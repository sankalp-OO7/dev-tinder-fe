import { Navigate, Outlet, useNavigate } from "react-router";
import "./App.css";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./redux/authSlice/authSlice.jsx";
import { BASE_URL } from "./utils/constants.jsx";
import Login from "./components/login.jsx";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  async function fetchData() {
    try {
      const response = await axios.get(BASE_URL + "/auth/user", {
        withCredentials: true,
      });
      dispatch(loginSuccess(response.data.user));
      // console.log("Data fetched successfully:", response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    if (!user) {
      fetchData();
    }
  }, []);

  return (
    <>
      {user ? (
        <>
          {" "}
          <Navbar />
          <Outlet />
          <Footer />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
