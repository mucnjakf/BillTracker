import { useAuth } from '../auth/BtAuthProvider.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router'
import BtProtectedRoute from './BtProtectedRoute.jsx'
import Dashboard from '../../pages/app/Dashboard.jsx'
import Account from '../../pages/auth/Account.jsx'
import AccountUpdate from '../../pages/auth/AccountUpdate.jsx'
import Login from '../../pages/auth/Login.jsx'
import Logout from '../../pages/auth/Logout.jsx'
import Register from '../../pages/auth/Register.jsx'
import CustomerBills from '../../pages/bill/CustomerBills.jsx'
import CustomerCreate from '../../pages/customer/CustomerCreate.jsx'
import CustomerDelete from '../../pages/customer/CustomerDelete.jsx'
import CustomerDetails from '../../pages/customer/CustomerDetails.jsx'
import Customers from '../../pages/customer/Customers.jsx'
import CustomerUpdate from '../../pages/customer/CustomerUpdate.jsx'
import CustomerBillCreate from '../../pages/bill/CustomerBillCreate.jsx'
import NotFound from '../../pages/app/NotFound.jsx'
import CustomerBillDelete from '../../pages/bill/CustomerBillDelete.jsx'
import CustomerBillUpdate from '../../pages/bill/CustomerBillUpdate.jsx'
import CustomerBillDetails from '../../pages/bill/CustomerBillDetails.jsx'
import BillItemCreate from '../../pages/item/BillItemCreate.jsx'
import BillItemDelete from '../../pages/item/BillItemDelete.jsx'
import BillItemDetails from '../../pages/item/BillItemDetails.jsx'
import BillItemUpdate from '../../pages/item/BillItemUpdate.jsx'
import Cities from '../../pages/city/Cities.jsx'
import CityCreate from '../../pages/city/CityCreate.jsx'
import CityUpdate from '../../pages/city/CityUpdate.jsx'
import CityDelete from '../../pages/city/CityDelete.jsx'
import CityDetails from '../../pages/city/CityDetails.jsx'
import Sellers from '../../pages/seller/Sellers.jsx'
import SellerCreate from '../../pages/seller/SellerCreate.jsx'
import SellerUpdate from '../../pages/seller/SellerUpdate.jsx'
import SellerDelete from '../../pages/seller/SellerDelete.jsx'
import SellerDetails from '../../pages/seller/SellerDetails.jsx'
import Categories from '../../pages/category/Categories.jsx'
import CategoryCreate from '../../pages/category/CategoryCreate.jsx'
import CategoryDelete from '../../pages/category/CategoryDelete.jsx'
import CategoryUpdate from '../../pages/category/CategoryUpdate.jsx'
import CategoryDetails from '../../pages/category/CategoryDetails.jsx'
import CategorySubCategoryCreate from '../../pages/subCategory/CategorySubCategoryCreate.jsx'
import CategorySubCategoryDetails from '../../pages/subCategory/CategorySubCategoryDetails.jsx'
import CategorySubCategoryUpdate from '../../pages/subCategory/CategorySubCategoryUpdate.jsx'
import CategorySubCategoryDelete from '../../pages/subCategory/CategorySubCategoryDelete.jsx'
import CategorySubCategories from '../../pages/subCategory/CategorySubCategories.jsx'
import SubCategoryProducts from '../../pages/product/SubCategoryProducts.jsx'
import SubCategoryProductCreate from '../../pages/product/SubCategoryProductCreate.jsx'
import SubCategoryProductDetails from '../../pages/product/SubCategoryProductDetails.jsx'
import SubCategoryProductUpdate from '../../pages/product/SubCategoryProductUpdate.jsx'
import SubCategoryProductDelete from '../../pages/product/SubCategoryProductDelete.jsx'

const BtRoutes = () => {
  const { accessToken } = useAuth()

  const routesForPublic = [
    {
      path: '/',
      element: <Dashboard/>,
    },
    {
      path: '/customers',
      element: <Customers/>,
    },
    {
      path: '*',
      element: <NotFound/>,
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
      element: <BtProtectedRoute/>,
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
          path: '/customers/:customerId/bills',
          element: <CustomerBills/>,
        },
        {
          path: '/customers/:customerId/bills/create',
          element: <CustomerBillCreate/>,
        },
        {
          path: '/customers/:customerId/bills/:billId',
          element: <CustomerBillDetails/>,
        },
        {
          path: '/customers/:customerId/bills/:billId/update',
          element: <CustomerBillUpdate/>,
        },
        {
          path: '/customers/:customerId/bills/:billId/delete',
          element: <CustomerBillDelete/>,
        },
        {
          path: '/customers/:customerId/bills/:billId/items/create',
          element: <BillItemCreate/>,
        },
        {
          path: '/customers/:customerId/bills/:billId/items/:itemId',
          element: <BillItemDetails/>,
        },
        {
          path: '/customers/:customerId/bills/:billId/items/:itemId/update',
          element: <BillItemUpdate/>,
        },
        {
          path: '/customers/:customerId/bills/:billId/items/:itemId/delete',
          element: <BillItemDelete/>,
        },
        {
          path: '/categories',
          element: <Categories/>,
        },
        {
          path: '/categories/create',
          element: <CategoryCreate/>,
        },
        {
          path: '/categories/:categoryId',
          element: <CategoryDetails/>,
        },
        {
          path: '/categories/:categoryId/update',
          element: <CategoryUpdate/>,
        },
        {
          path: '/categories/:categoryId/delete',
          element: <CategoryDelete/>,
        },
        {
          path: '/categories/:categoryId/subcategories',
          element: <CategorySubCategories/>,
        },
        {
          path: '/categories/:categoryId/subcategories/create',
          element: <CategorySubCategoryCreate/>,
        },
        {
          path: '/categories/:categoryId/subcategories/:subCategoryId',
          element: <CategorySubCategoryDetails/>,
        },
        {
          path: '/categories/:categoryId/subcategories/:subCategoryId/update',
          element: <CategorySubCategoryUpdate/>,
        },
        {
          path: '/categories/:categoryId/subcategories/:subCategoryId/delete',
          element: <CategorySubCategoryDelete/>,
        },
        {
          path: '/categories/:categoryId/subcategories/:subCategoryId/products',
          element: <SubCategoryProducts/>,
        },
        {
          path: '/categories/:categoryId/subcategories/:subCategoryId/products/create',
          element: <SubCategoryProductCreate/>,
        },
        {
          path: '/categories/:categoryId/subcategories/:subCategoryId/products/:productId',
          element: <SubCategoryProductDetails/>,
        },
        {
          path: '/categories/:categoryId/subcategories/:subCategoryId/products/:productId/update',
          element: <SubCategoryProductUpdate/>,
        },
        {
          path: '/categories/:categoryId/subcategories/:subCategoryId/products/:productId/delete',
          element: <SubCategoryProductDelete/>,
        },
        {
          path: '/sellers',
          element: <Sellers/>,
        },
        {
          path: '/sellers/create',
          element: <SellerCreate/>,
        },
        {
          path: '/sellers/:sellerId',
          element: <SellerDetails/>,
        },
        {
          path: '/sellers/:sellerId/update',
          element: <SellerUpdate/>,
        },
        {
          path: '/sellers/:sellerId/delete',
          element: <SellerDelete/>,
        },
        {
          path: '/cities',
          element: <Cities/>,
        },
        {
          path: '/cities/create',
          element: <CityCreate/>,
        },
        {
          path: '/cities/:cityId',
          element: <CityDetails/>,
        },
        {
          path: '/cities/:cityId/update',
          element: <CityUpdate/>,
        },
        {
          path: '/cities/:cityId/delete',
          element: <CityDelete/>,
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
