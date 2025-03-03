import { useAuth } from "../../components/BtAuthProvider";
import { useState, useEffect } from "react";
import AuthService from "../../services/AuthService";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { BsPen, BsXCircle } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useNavigate } from "react-router";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Alert from "react-bootstrap/Alert";

// TODO: errors, validation
const AccountUpdate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const data = await AuthService.getUser(user.id);

      setName(data.name);
      setSurname(data.surname);
      setEmail(data.email);
    };

    getUser();
  }, [user.id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    await AuthService.updateUser(user.id, name, surname, email, password);
    navigate("/logout");
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/account">Account</Breadcrumb.Item>
        <Breadcrumb.Item active>Update</Breadcrumb.Item>
      </Breadcrumb>

      <h3 className="mb-3">Update account</h3>

      <Alert variant="warning" className="w-25">
        After updating account, you will be logged out!
      </Alert>

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
          <ButtonGroup className="w-100">
            <Button
              variant="primary"
              onClick={handleUpdate}
              className="me-2 rounded-end"
            >
              <BsPen className="me-2" />
              Confirm
            </Button>

            <Button
              variant="secondary"
              className="rounded-start"
              onClick={() => navigate("/account")}
            >
              <BsXCircle className="me-2" />
              Cancel
            </Button>
          </ButtonGroup>
        </Card.Footer>
      </Card>
    </>
  );
};

export default AccountUpdate;
