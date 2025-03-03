import { RouterProvider, createBrowserRouter } from "react-router";
import ProtectedRotue from "./BtProtectedRoute";
import App from "../pages/app/App";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Logout from "../pages/auth/Logout";
import Customers from "../pages/customer/Customers";
import BtNotFound from "../components/BtNotFound";

function BtRoutes() {
  // TODO: moguce da ako si ulogiran mozes na ove rute, treba onaj drugi nacin
  const routesForPublic = [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/customers",
      element: <Customers />,
    },
    {
      path: "*",
      element: <BtNotFound />,
    },
  ];

  const routesForAuthenticated = [
    {
      element: <ProtectedRotue />,
      children: [
        {
          path: "/customers/:customerId",
          element: <div>Customer details</div>,
        },
        {
          path: "/bills",
          element: <div>Bills</div>,
        },
        {
          path: "/items",
          element: <div>Items</div>,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticated,
  ]);

  return <RouterProvider router={router} />;
}

export default BtRoutes;
