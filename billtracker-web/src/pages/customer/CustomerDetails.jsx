import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import CustomerService from "../../services/CustomerService";
import BtBreadcrumb from "../../components/BtBreadcrumb";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { BsTrash, BsPen } from "react-icons/bs";
import BtRowCol from "../../components/BtRowCol";

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

      <h2 className="mb-3">Customer details</h2>

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
        <Button
          variant="secondary"
          onClick={() => navigate(`update?returnUrl=/customers/${customerId}`)}
          className="me-3"
        >
          <BsPen className="me-2" />
          Update customer
        </Button>

        <Button
          variant="danger"
          onClick={() => navigate(`delete?returnUrl=/customers/${customerId}`)}
          className="me-3"
        >
          <BsTrash className="me-2" />
          Delete customer
        </Button>
      </div>
    </>
  );
};

export default CustomerDetails;
