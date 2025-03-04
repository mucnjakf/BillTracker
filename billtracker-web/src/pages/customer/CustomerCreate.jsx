import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import BtIconButton from "../../components/BtIconButton";
import { BsPersonAdd, BsXCircle } from "react-icons/bs";
import BtBreadcrumb from "../../components/BtBreadcrumb";
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
      <BtBreadcrumb
        paths={[
          { label: "Home", href: "/" },
          { label: "Customers", href: "/customers" },
          { label: "Create" },
        ]}
      />

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
            <BtIconButton
              variant="primary"
              onClick={handleCreate}
              className="me-2 rounded-end"
              icon={BsPersonAdd}
              label="Confirm"
            />

            <BtIconButton
              variant="secondary"
              onClick={() => navigate("/customers")}
              className="rounded-start"
              icon={BsXCircle}
              label="Cancel"
            />
          </ButtonGroup>
        </Card.Footer>
      </Card>
    </>
  );
};

export default CustomerCreate;
