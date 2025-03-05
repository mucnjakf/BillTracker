import BtCard from "../../components/BtCard";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import BtIconButton from "../../components/BtIconButton";
import AuthService from "../../services/AuthService";
import BtPageTitle from "../../components/BtPageTitle";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { useAuth } from "../../components/BtAuthProvider";
import { useNavigate } from "react-router";
import { useState } from "react";

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
      <BtPageTitle text="Login" className="text-center mt-5" />

      <div className="d-flex justify-content-center">
        <BtCard width="500px">
          <BtCard.Body>
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
          </BtCard.Body>

          <BtCard.Footer>
            <BtIconButton
              variant="primary"
              onClick={handleLogin}
              className="w-100"
              icon={BsBoxArrowInLeft}
              label="Login"
            />
          </BtCard.Footer>
        </BtCard>
      </div>
    </>
  );
};

export default Login;
