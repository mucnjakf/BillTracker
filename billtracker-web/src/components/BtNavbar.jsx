import BillTrackerLogo from "../assets/billtracker.svg";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuth } from "./BtAuthProvider";
import {
  BsPerson,
  BsCashStack,
  BsCart4,
  BsBoxArrowRight,
  BsBoxArrowInLeft,
  BsPersonPlus,
  BsPersonCircle,
} from "react-icons/bs";

const BtNavbar = () => {
  const { accessToken, user } = useAuth();

  return (
    <Navbar className="d-flex justify-content-between">
      <div>
        <Navbar.Brand href="/">
          <Image
            src={BillTrackerLogo}
            className="me-3"
            style={{ width: "30px", height: "30px" }}
          />
          BillTracker
        </Navbar.Brand>
      </div>

      <Nav>
        <Nav.Link href="/customers" className="me-3">
          <BsPerson className="me-2" />
          Customers
        </Nav.Link>

        {accessToken ? (
          <>
            <Nav.Link href="/bills" className="me-3">
              <BsCashStack className="me-2" />
              Bills
            </Nav.Link>

            <Nav.Link href="/items" className="me-3">
              <BsCart4 className="me-2" />
              Items
            </Nav.Link>

            <Dropdown>
              <Dropdown.Toggle
                variant="outline-dark"
                style={{ width: "160px" }}
              >
                {user.email}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "160px" }}>
                <Dropdown.Item href="/account">
                  <BsPersonCircle className="me-2" />
                  Account
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/logout">
                  <BsBoxArrowRight className="me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : (
          <>
            <Nav.Link href="/login" className="me-3">
              <BsBoxArrowInLeft className="me-2" />
              Login
            </Nav.Link>

            <Nav.Link href="/register">
              <BsPersonPlus className="me-2" />
              Register
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default BtNavbar;
