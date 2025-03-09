import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useAuth } from './BtAuthProvider.jsx'
import { BsCart4, BsCashStack, BsHouse, BsPerson } from 'react-icons/bs'

const BtSideBar = () => {
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
                  className={`mb-2 px-3 rounded w-100 ${location.pathname === '/customers' ? 'bg-dark text-white' : ''}`}>
          <BsPerson className="me-3"/>
          Customers
        </Nav.Link>

        {accessToken ? (
          <>
            {/*<Nav.Link href="/bills"*/}
            {/*          className={`mb-2 px-3 rounded w-100 ${location.pathname === '/bills' ? 'bg-dark text-white' : ''}`}>*/}
            {/*  <BsCashStack className="me-3"/>*/}
            {/*  CustomerBills*/}
            {/*</Nav.Link>*/}

            {/*<Nav.Link href="/items"*/}
            {/*          className={`px-3 rounded w-100 ${location.pathname === '/items' ? 'bg-dark text-white' : ''}`}>*/}
            {/*  <BsCart4 className="me-3"/>*/}
            {/*  Items*/}
            {/*</Nav.Link>*/}
          </>
        ) : <></>}
      </Nav>
    </Navbar>
  )
}

export default BtSideBar