import ProtectedRotue from './BtProtectedRoute'
import Home from '../pages/app/Home'
import Account from '../pages/auth/Account'
import AccountUpdate from '../pages/auth/AccountUpdate'
import Login from '../pages/auth/Login'
import Logout from '../pages/auth/Logout'
import Register from '../pages/auth/Register'
import Bills from '../pages/bill/Bills'
import CustomerCreate from '../pages/customer/CustomerCreate'
import CustomerDelete from '../pages/customer/CustomerDelete'
import CustomerDetails from '../pages/customer/CustomerDetails'
import Customers from '../pages/customer/Customers'
import CustomerUpdate from '../pages/customer/CustomerUpdate'
import Items from '../pages/item/Items'
import BtNotFound from '../components/BtNotFound'
import { useAuth } from '../components/BtAuthProvider'
import { RouterProvider, createBrowserRouter } from 'react-router'

const BtRoutes = () => {
  const { accessToken } = useAuth()

  const routesForPublic = [
    {
      path: '/',
      element: <Home/>,
    },
    {
      path: '/customers',
      element: <Customers/>,
    },
    {
      path: '*',
      element: <BtNotFound/>,
    },
  ]

  const routesForUnauthenticated = [
    {
      path: '/register',
      element: <Register/>,
    },
    {
      path: '/login',
      element: <Login/>,
    },
  ]

  const routesForAuthenticated = [
    {
      element: <ProtectedRotue/>,
      children: [
        {
          path: '/customers/create',
          element: <CustomerCreate/>,
        },
        {
          path: '/customers/:customerId',
          element: <CustomerDetails/>,
        },
        {
          path: '/customers/:customerId/update',
          element: <CustomerUpdate/>,
        },
        {
          path: '/customers/:customerId/delete',
          element: <CustomerDelete/>,
        },
        {
          path: '/bills',
          element: <Bills/>,
        },
        {
          path: '/items',
          element: <Items/>,
        },
        {
          path: '/account',
          element: <Account/>,
        },
        {
          path: '/account/update',
          element: <AccountUpdate/>,
        },
        {
          path: '/logout',
          element: <Logout/>,
        },
      ],
    },
  ]

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!accessToken ? routesForUnauthenticated : []),
    ...routesForAuthenticated,
  ])

  return <RouterProvider router={router}/>
}

export default BtRoutes
