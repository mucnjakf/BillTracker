import ButtonGroup from "react-bootstrap/ButtonGroup";
import CityService from "../../services/CityService";
import CustomerService from "../../services/CustomerService";
import BtFloatingTextInput from "../../components/BtFloatingTextInput";
import BtCard from "../../components/BtCard";
import BtIconButton from "../../components/BtIconButton";
import BtBreadcrumb from "../../components/BtBreadcrumb";
import BtPageTitle from "../../components/BtPageTitle";
import BtFloatingSelect from "../../components/BtFloatingSelect";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { BsPen, BsXCircle } from "react-icons/bs";

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

          <BtFloatingSelect
            controlId="selectCities"
            label="City"
            value={cityId}
            onChange={setCityId}
            placeholder="Select city"
            items={cities}
          />
        </BtCard.Body>

        <BtCard.Footer>
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
        </BtCard.Footer>
      </BtCard>
    </>
  );
};

export default CustomerUpdate;
