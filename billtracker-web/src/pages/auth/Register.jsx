import { Card } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BsPersonPlus } from "react-icons/bs";

function Register() {
  return (
    <>
      <h3 className="text-center mt-5 mb-3">Register</h3>
      <div className="d-flex justify-content-center">
        <Card className="w-25">
          <Card.Body>
            <FloatingLabel controlId="txtName" label="Name" className="mb-3">
              <Form.Control type="text" placeholder="Name" />
            </FloatingLabel>

            <FloatingLabel
              controlId="txtSurname"
              label="Surname"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Surname" />
            </FloatingLabel>

            <FloatingLabel controlId="txtEmail" label="Email" className="mb-3">
              <Form.Control type="email" placeholder="Email" />
            </FloatingLabel>

            <FloatingLabel controlId="txtPassword" label="Password">
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary" className="w-100">
              <BsPersonPlus className="me-2" />
              Register
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}

export default Register;
