import BillTrackerLogo from '../../assets/billtracker.svg'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import Image from 'react-bootstrap/Image'
import { useAuth } from '../auth/BtAuthProvider.jsx'
import {
  BsBoxArrowRight,
  BsBoxArrowInLeft,
  BsPersonCircle,
} from 'react-icons/bs'

const BtTopMenu = () => {
  const { accessToken, user } = useAuth()

  return (
    <Navbar className="d-flex justify-content-between mx-2">
      <div>
        <Navbar.Brand href="/">
          <Image
            src={BillTrackerLogo}
            className="me-3"
            style={{ width: '30px', height: '30px' }}
          />
          BillTracker
        </Navbar.Brand>
      </div>

      <Nav>
        {accessToken ? (
          <Dropdown>
            <Dropdown.Toggle
              variant={location.pathname === '/account' ? 'dark' : 'outline-dark'}
              style={{ width: '160px' }}
            >
              {user.email}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ width: '160px' }}>
              <Dropdown.Item href="/account">
                <BsPersonCircle className="me-3"/>
                Account
              </Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item href="/logout">
                <BsBoxArrowRight className="me-3"/>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <>
            <Nav.Link href="/login"
                      className={`px-4 me-2 rounded ${location.pathname === '/login' ? 'bg-dark text-white' : ''}`}>
              <BsBoxArrowInLeft className="me-2"/>
              Login
            </Nav.Link>

            <Nav.Link href="/register"
                      className={`px-4 rounded ${location.pathname === '/register' ? 'bg-dark text-white' : ''}`}>
              <BsPersonCircle className="me-2"/>
              Register
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  )
}

export default BtTopMenu
