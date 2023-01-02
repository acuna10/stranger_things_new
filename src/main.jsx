import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./404";
import "./index.css";
import EditThing, { action as editAction } from "./routes/edit";
import Login, { action as loginAction } from "./routes/login";
import Register, { action as registerAction } from "./routes/register";
import Root, {
  action as rootAction,
  loader as rootLoader,
} from "./routes/root";
import Thing, { loader as thingLoader } from "./routes/thing";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "things/:thingId",
        element: <Thing />,
        loader: thingLoader,
      },
      {
        path: "things/:thingId/edit",
        element: <EditThing />,
        loader: thingLoader,
        action: editAction,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
