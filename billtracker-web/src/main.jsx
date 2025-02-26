import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./Pages/App";
import Customers from "./Pages/Customers";
import Bills from "./Pages/Bills";
import Items from "./Pages/Items";
import Products from "./Pages/Products";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BtNavbar from "./Components/BtNavbar";

createRoot(document.getElementById("root")).render(
  <StrictMode>
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
              <Route path="/bills" element={<Bills />} />
              <Route path="/items" element={<Items />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </BrowserRouter>
        </Col>
      </Row>
    </Container>
  </StrictMode>
);
