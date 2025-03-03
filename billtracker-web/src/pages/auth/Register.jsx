import { Card } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BsPersonPlus } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useState } from "react";
import AuthService from "../../services/AuthService";

// TODO: erorr messages, validation
const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    await AuthService.register(name, surname, email, password);
    navigate("/login");
  };

  return (
    <>
      <h2 className="text-center mt-5 mb-3">Register</h2>
      <div className="d-flex justify-content-center">
        <Card className="w-25">
          <Card.Body>
            <FloatingLabel controlId="txtName" label="Name" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="txtSurname"
              label="Surname"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel controlId="txtEmail" label="Email" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel controlId="txtPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
          </Card.Body>
          <Card.Footer>
            <Button
              variant="primary"
              className="w-100"
              onClick={handleRegister}
            >
              <BsPersonPlus className="me-2" />
              Register
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
};

export default Register;
