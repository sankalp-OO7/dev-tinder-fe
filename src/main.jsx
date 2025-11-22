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
import store from "./redux/store.jsx";
import Connection from "./components/Connection.jsx";

import { Provider } from "react-redux";
import Feed from "./components/Feed.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/feed", element: <Feed /> },
      { path: "/profile", element: <Profile /> },
      { path: "/body", element: <Body /> },
      { path: "/connection", element: <Connection /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
