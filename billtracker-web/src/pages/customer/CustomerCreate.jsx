import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import BtFloatingTextInput from "../../components/BtFloatingTextInput";
import BtCard from "../../components/BtCard";
import BtIconButton from "../../components/BtIconButton";
import BtBreadcrumb from "../../components/BtBreadcrumb";
import CityService from "../../services/CityService";
import CustomerService from "../../services/CustomerService";
import BtPageTitle from "../../components/BtPageTitle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BsPersonAdd, BsXCircle } from "react-icons/bs";

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

      <BtPageTitle text="Customer create" />

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
            controlId="txtTelephone"
            label="Telephone"
            className="mb-3"
            type="text"
            placeholder="Telephone"
            value={telephone}
            onChange={setTelephone}
          />

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
        </BtCard.Body>

        <BtCard.Footer>
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
        </BtCard.Footer>
      </BtCard>
    </>
  );
};

export default CustomerCreate;
