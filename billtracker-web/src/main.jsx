import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { createRoot } from "react-dom/client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BtNavbar from "./Components/BtNavbar";
import BtAuthProvider from "./components/BtAuthProvider";
import BtRoutes from "./routes/BtRoutes";

createRoot(document.getElementById("root")).render(
  <Container fluid className="d-flex flex-column vh-100">
    <Row className="border-bottom">
      <Col>
        <BtNavbar />
      </Col>
    </Row>
    <Row className="flex-fill p-3">
      <Col>
        <BtAuthProvider>
          <BtRoutes />
        </BtAuthProvider>
      </Col>
    </Row>
  </Container>
);
