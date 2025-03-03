import { RouterProvider, createBrowserRouter } from "react-router";
import ProtectedRotue from "./BtProtectedRoute";
import App from "../pages/app/App";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Logout from "../pages/auth/Logout";
import Customers from "../pages/customer/Customers";
import BtNotFound from "../components/BtNotFound";

const BtRoutes = () => {
  // TODO: moguce da ako si ulogiran mozes na ove rute, treba onaj drugi nac - da fixat to
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
          path: "/customers/create",
          element: <div>Customer create</div>,
        },
        {
          path: "/customers/:customerId",
          element: <div>Customer details</div>,
        },
        {
          path: "/customers/:customerId/update",
          element: <div>Customer update</div>,
        },
        {
          path: "/customers/:customerId/delete",
          element: <div>Customer delete</div>,
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
};

export default BtRoutes;
