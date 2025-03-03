import { Card } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { useAuth } from "../../components/BtAuthProvider";
import { useNavigate } from "react-router";
import { useState } from "react";
import AuthService from "../../services/AuthService";

// TODO: error message, form validation
const Login = () => {
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await AuthService.login(email, password);
    setAccessToken(data.accessToken);
    navigate("/");
  };

  return (
    <>
      <h2 className="text-center mt-5 mb-3">Login</h2>
      <div className="d-flex justify-content-center">
        <Card className="w-25">
          <Card.Body>
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
            <Button variant="primary" className="w-100" onClick={handleLogin}>
              <BsBoxArrowInLeft className="me-2" />
              Login
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
};

export default Login;
