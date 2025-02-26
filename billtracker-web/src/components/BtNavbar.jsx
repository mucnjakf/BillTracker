import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import BillTrackerLogo from "../assets/billtracker.svg";
import { BsPerson, BsCashStack, BsCart4, BsCardText } from "react-icons/bs";

function BtNavbar() {
  return (
    <Navbar className="d-flex justify-content-between">
      <Navbar.Brand href="/">
        {/* TODO add icon + on other navs */}
        <Image
          src={BillTrackerLogo}
          className="me-2"
          style={{ width: "30px", height: "30px" }}
        />
        BillTracker
      </Navbar.Brand>

      <Nav>
        <Nav.Link href="/customers" className="me-3">
          <BsPerson className="me-2" />
          Customers
        </Nav.Link>
        <Nav.Link href="/bills" className="me-3">
          <BsCashStack className="me-2" />
          Bills
        </Nav.Link>
        <Nav.Link href="/items" className="me-3">
          <BsCart4 className="me-2" />
          Items
        </Nav.Link>
        <Nav.Link href="/products">
          <BsCardText className="me-2" />
          Products
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default BtNavbar;
