import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./pages/app/App.jsx";
import Customers from "./pages/customer/Customers";
import CustomerDetails from "./pages/customer/CustomerDetails.jsx";
import Bills from "./pages/bill/Bills.jsx";
import Items from "./pages/item/Items.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BtNavbar from "./Components/BtNavbar";

createRoot(document.getElementById("root")).render(
  <Container fluid className="d-flex flex-column vh-100">
    <Row className="border-bottom">
      <Col>
        <BtNavbar />
      </Col>
    </Row>
    <Row className="flex-fill p-3">
      <Col>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:customerId" element={<CustomerDetails />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/items" element={<Items />} />
            {/* TODO: add not found */}
          </Routes>
        </BrowserRouter>
      </Col>
    </Row>
  </Container>
);
