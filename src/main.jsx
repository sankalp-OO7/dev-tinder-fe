import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Link } from "react-router";
import { RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Login from "./components/login.jsx";
import Profile from "./components/Profile.jsx";
import Body from "./components/Body.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/profile", element: <Profile /> },
      { path: "/body", element: <Body /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
