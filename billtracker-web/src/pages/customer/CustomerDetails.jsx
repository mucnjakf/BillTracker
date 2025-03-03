import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import CustomerService from "../../services/CustomerService";
import BtBreadcrumb from "../../components/BtBreadcrumb";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import BtIconButton from "../../components/BtIconButton";
import { BsTrash, BsPen } from "react-icons/bs";
import BtRowCol from "../../components/BtRowCol";
import BtPageTitle from "../../components/BtPageTitle";

const CustomerDetails = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    const getCustomer = async () => {
      const data = await CustomerService.get(customerId);
      setCustomer(data);
    };

    getCustomer();
  }, [customerId]);

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: "Home", href: "/" },
          { label: "Customers", href: "/customers" },
          { label: "Details" },
        ]}
      />

      <BtPageTitle text="Customer details" />

      <Card className="mb-3" style={{ width: "1000px" }}>
        <Card.Body>
          <Container>
            <BtRowCol
              columns={[
                { size: "col-12", label: "GUID", value: customer.guid },
              ]}
            />

            <BtRowCol
              columns={[
                { size: "col-4", label: "ID", value: customer.id },
                {
                  size: "col-8",
                  label: "Created",
                  value: new Date(customer.createdUtc).toLocaleString(),
                },
              ]}
            />

            <BtRowCol
              columns={[
                { size: "col-4", label: "Name", value: customer.name },
                { size: "col-8", label: "Surname", value: customer.surname },
              ]}
            />

            <BtRowCol
              isLastRow={true}
              columns={[
                { size: "col-4", label: "Email", value: customer.email },
                {
                  size: "col-4",
                  label: "Telephone",
                  value: customer.telephone,
                },
                { size: "col-4", label: "City", value: customer.cityName },
              ]}
            />
          </Container>
        </Card.Body>
      </Card>

      <div className="d-flex">
        <BtIconButton
          variant="secondary"
          onClick={() => navigate(`update?returnUrl=/customers/${customerId}`)}
          icon={BsPen}
          label="Update customer"
          className="me-3"
        />

        <BtIconButton
          variant="danger"
          onClick={() => navigate(`delete?returnUrl=/customers/${customerId}`)}
          icon={BsTrash}
          label="Delete customer"
        />
      </div>
    </>
  );
};

export default CustomerDetails;
