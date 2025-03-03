import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import BillTrackerLogo from "../assets/billtracker.svg";
import {
  BsPerson,
  BsCashStack,
  BsCart4,
  BsBoxArrowRight,
  BsBoxArrowInLeft,
  BsPersonPlus,
} from "react-icons/bs";
import { useAuth } from "./BtAuthProvider";

const BtNavbar = () => {
  const { accessToken } = useAuth();

  return (
    <Navbar className="d-flex justify-content-between">
      <Navbar.Brand href="/">
        <Image
          src={BillTrackerLogo}
          className="me-3"
          style={{ width: "30px", height: "30px" }}
        />
        BillTracker
      </Navbar.Brand>

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
            <Nav.Link href="/logout" className="me-3">
              <BsBoxArrowRight className="me-2" />
              Logout
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link href="/login" className="me-3">
              <BsBoxArrowInLeft className="me-2" />
              Login
            </Nav.Link>
            <Nav.Link href="/register" className="me-3">
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
