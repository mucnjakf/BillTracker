import { RouterProvider, createBrowserRouter } from "react-router";
import ProtectedRotue from "./BtProtectedRoute";
import Home from "../pages/app/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Logout from "../pages/auth/Logout";
import Account from "../pages/auth/Account";
import AccountUpdate from "../pages/auth/AccountUpdate";
import Customers from "../pages/customer/Customers";
import CustomerCreate from "../pages/customer/CustomerCreate";
import CustomerDetails from "../pages/customer/CustomerDetails";
import CustomerUpdate from "../pages/customer/CustomerUpdate";
import BtNotFound from "../components/BtNotFound";
import { useAuth } from "../components/BtAuthProvider";

const BtRoutes = () => {
  const { accessToken } = useAuth();

  const routesForPublic = [
    {
      path: "/",
      element: <Home />,
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
          element: <CustomerCreate />,
        },
        {
          path: "/customers/:customerId",
          element: <CustomerDetails />,
        },
        {
          path: "/customers/:customerId/update",
          element: <CustomerUpdate />,
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
          path: "/account",
          element: <Account />,
        },
        {
          path: "/account/update",
          element: <AccountUpdate />,
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
