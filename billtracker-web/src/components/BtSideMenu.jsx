import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useAuth } from './BtAuthProvider.jsx'
import {
  BsBasket,
  BsBoxSeam,
  BsBuildings,
  BsCashCoin,
  BsHouse,
  BsPerson,
  BsShop,
  BsTag,
  BsTags,
} from 'react-icons/bs'

const BtSideMenu = () => {
  const { accessToken } = useAuth()

  return (
    <Navbar>
      <Nav className="d-flex flex-column w-100 px-2">
        <Nav.Link href="/"
                  className={`mb-2 px-3 rounded w-100 ${location.pathname === '/' ? 'bg-dark text-white' : ''}`}>
          <BsHouse className="me-3"/>
          Home
        </Nav.Link>

        <Nav.Link href="/customers"
                  className={`mb-2 px-3 rounded w-100 ${location.pathname.startsWith('/customers') ? 'bg-dark text-white' : ''}`}>
          <BsPerson className="me-3"/>
          Customers
        </Nav.Link>

        {accessToken ? (
          <>
            <Nav.Link href="/bills"
                      className={`mb-2 px-3 rounded w-100 ${location.pathname.startsWith('/bills') ? 'bg-dark text-white' : ''}`}>
              <BsCashCoin className="me-3"/>
              Bills
            </Nav.Link>
            <Nav.Link href="/items"
                      className={`mb-2 px-3 rounded w-100 ${location.pathname.startsWith('/items') ? 'bg-dark text-white' : ''}`}>
              <BsBasket className="me-3"/>
              Items
            </Nav.Link>
            <Nav.Link href="/products"
                      className={`mb-2 px-3 rounded w-100 ${location.pathname.startsWith('/products') ? 'bg-dark text-white' : ''}`}>
              <BsBoxSeam className="me-3"/>
              Products
            </Nav.Link>
            <Nav.Link href="/categories"
                      className={`mb-2 px-3 rounded w-100 ${location.pathname.startsWith('/categories') ? 'bg-dark text-white' : ''}`}>
              <BsTags className="me-3"/>
              Categories
            </Nav.Link>
            <Nav.Link href="/subcategories"
                      className={`mb-2 px-3 rounded w-100 ${location.pathname.startsWith('/subcategories') ? 'bg-dark text-white' : ''}`}>
              <BsTag className="me-3"/>
              Sub-categories
            </Nav.Link>
            <Nav.Link href="/sellers"
                      className={`mb-2 px-3 rounded w-100 ${location.pathname.startsWith('/sellers') ? 'bg-dark text-white' : ''}`}>
              <BsShop className="me-3"/>
              Sellers
            </Nav.Link>
            <Nav.Link href="/cities"
                      className={`mb-2 px-3 rounded w-100 ${location.pathname.startsWith('/cities') ? 'bg-dark text-white' : ''}`}>
              <BsBuildings className="me-3"/>
              Cities
            </Nav.Link>
          </>
        ) : <></>}
      </Nav>
    </Navbar>
  )
}

export default BtSideMenu