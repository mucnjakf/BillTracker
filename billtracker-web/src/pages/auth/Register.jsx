import BtCard from "../../components/BtCard";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import BtIconButton from "../../components/BtIconButton";
import AuthService from "../../services/AuthService";
import BtPageTitle from "../../components/BtPageTitle";
import { BsPersonPlus } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useState } from "react";

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
      <BtPageTitle text="Register" className="text-center mt-5" />

      <div className="d-flex justify-content-center">
        <BtCard width="500px">
          <BtCard.Body>
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
          </BtCard.Body>

          <BtCard.Footer>
            <BtIconButton
              variant="primary"
              onClick={handleRegister}
              icon={BsPersonPlus}
              label="Register"
              className="w-100"
            />
          </BtCard.Footer>
        </BtCard>
      </div>
    </>
  );
};

export default Register;
