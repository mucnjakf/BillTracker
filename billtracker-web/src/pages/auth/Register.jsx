import AuthService from "../../services/AuthService";
import BtFloatingTextInput from "../../components/BtFloatingTextInput";
import BtCard from "../../components/BtCard";
import BtIconButton from "../../components/BtIconButton";
import BtPageTitle from "../../components/BtPageTitle";
import { useState } from "react";
import { useNavigate } from "react-router";
import { BsPersonPlus } from "react-icons/bs";

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
            <BtFloatingTextInput
              controlId="txtName"
              label="Name"
              className="mb-3"
              type="text"
              placeholder="Name"
              value={name}
              onChange={setName}
            />

            <BtFloatingTextInput
              controlId="txtSurname"
              label="Surname"
              className="mb-3"
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={setSurname}
            />

            <BtFloatingTextInput
              controlId="txtEmail"
              label="Email"
              className="mb-3"
              type="text"
              placeholder="Email"
              value={email}
              onChange={setEmail}
            />

            <BtFloatingTextInput
              controlId="txtPassword"
              label="Password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={setPassword}
            />
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
