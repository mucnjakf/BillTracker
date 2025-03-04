import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BsPersonAdd, BsXCircle } from "react-icons/bs";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import CityService from "../../services/CityService";
import CustomerService from "../../services/CustomerService";

// TODO: erorr messages, validation
const CustomerCreate = () => {
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [cityId, setCityId] = useState("");

  useEffect(() => {
    const getCities = async () => {
      const data = await CityService.getAll();
      setCities(data);
    };

    getCities();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    await CustomerService.create(name, surname, email, telephone, cityId);
    navigate("/customers");
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/customers">Customers</Breadcrumb.Item>
        <Breadcrumb.Item active>Create</Breadcrumb.Item>
      </Breadcrumb>

      <h2 className="mb-3">Create customer</h2>

      <Card style={{ width: "500px" }}>
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

          <FloatingLabel
            controlId="txtTelephone"
            label="Telephone"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="selectCities"
            label="City"
            value={cityId}
            onChange={(e) => {
              setCityId(e.target.value);
            }}
          >
            <Form.Select>
              <option selected disabled>
                Select city
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Card.Body>
        <Card.Footer>
          <ButtonGroup className="w-100">
            <Button
              variant="primary"
              onClick={handleCreate}
              className="me-2 rounded-end"
            >
              <BsPersonAdd className="me-2" />
              Confirm
            </Button>

            <Button
              variant="secondary"
              className="rounded-start"
              onClick={() => navigate("/customers")}
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

export default CustomerCreate;
