import Login from "~/pages/Login";
import Register from "~/pages/Register";
import Unauthorized from "~/pages/Unauthorized";
import Home from "~/pages/Home";

export const PublicRoutes = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "unauthorized",
    element: <Unauthorized />,
  },
];
