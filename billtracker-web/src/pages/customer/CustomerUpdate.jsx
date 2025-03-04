import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import BtIconButton from "../../components/BtIconButton";
import BtBreadcrumb from "../../components/BtBreadcrumb";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import CityService from "../../services/CityService";
import CustomerService from "../../services/CustomerService";
import { BsPen, BsXCircle } from "react-icons/bs";
import BtPageTitle from "../../components/BtPageTitle";

// TODO: errors, validation
const CustomerUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { customerId } = useParams();
  const [cities, setCities] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [cityId, setCityId] = useState("");

  const returnUrl =
    new URLSearchParams(location.search).get("returnUrl") || "/customers";

  useEffect(() => {
    const getCustomer = async () => {
      const data = await CustomerService.get(customerId);

      setName(data.name);
      setSurname(data.surname);
      setEmail(data.email);
      setTelephone(data.telephone);
      setCityId(data.cityId === 0 ? null : data.cityId);
    };

    getCustomer();
  }, [customerId]);

  useEffect(() => {
    const getCities = async () => {
      const data = await CityService.getAll();
      setCities(data);
    };

    getCities();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    await CustomerService.update(
      customerId,
      name,
      surname,
      email,
      telephone,
      cityId
    );
    navigate(returnUrl);
  };

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: "Home", href: "/" },
          { label: "Customers", href: "/customers" },
          returnUrl.startsWith("/customers/")
            ? { label: "Details", href: `/customers/${customerId}` }
            : null,
          { label: "Update" },
        ].filter(Boolean)}
      />

      <BtPageTitle text="Customer update" />

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

          <FloatingLabel controlId="selectCities" label="City">
            <Form.Select
              value={cityId}
              onChange={(e) => {
                setCityId(e.target.value);
              }}
            >
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
              onClick={handleUpdate}
              className="me-2 rounded-end"
              icon={BsPen}
              label="Confirm"
            />

            <BtIconButton
              variant="secondary"
              onClick={() => navigate(returnUrl)}
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

export default CustomerUpdate;
