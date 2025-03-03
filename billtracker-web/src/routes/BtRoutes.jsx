import { RouterProvider, createBrowserRouter } from "react-router";
import ProtectedRotue from "./BtProtectedRoute";
import App from "../pages/app/App";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Logout from "../pages/auth/Logout";
import Customers from "../pages/customer/Customers";
import BtNotFound from "../components/BtNotFound";
import { useAuth } from "../components/BtAuthProvider";

const BtRoutes = () => {
  const { accessToken } = useAuth();

  const routesForPublic = [
    {
      path: "/",
      element: <App />,
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

  const routesForUnauthenticated = [
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
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
    ...(!accessToken ? routesForUnauthenticated : []),
    ...routesForAuthenticated,
  ]);

  return <RouterProvider router={router} />;
};

export default BtRoutes;
