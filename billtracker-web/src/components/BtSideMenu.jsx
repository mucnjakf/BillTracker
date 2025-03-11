import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useAuth } from './BtAuthProvider.jsx'
import { BsHouse, BsPerson } from 'react-icons/bs'

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

          </>
        ) : <></>}
      </Nav>
    </Navbar>
  )
}

export default BtSideMenu