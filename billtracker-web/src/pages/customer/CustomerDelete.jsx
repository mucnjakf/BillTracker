import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import BtBreadcrumb from "../../components/BtBreadcrumb";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import CustomerService from "../../services/CustomerService";
import { BsTrash, BsXCircle } from "react-icons/bs";

const CustomerDelete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { customerId } = useParams();
  const [customer, setCustomer] = useState({});

  const returnUrl =
    new URLSearchParams(location.search).get("returnUrl") || "/customers";

  useEffect(() => {
    const getCustomer = async () => {
      const data = await CustomerService.get(customerId);
      setCustomer(data);
    };

    getCustomer();
  }, [customerId]);

  const handleDelete = async (e) => {
    e.preventDefault();

    await CustomerService.delete(customerId);
    navigate("/customers");
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
          { label: "Delete" },
        ].filter(Boolean)}
      />

      <h2 className="mb-3">Delete customer</h2>

      <Card style={{ width: "500px" }}>
        <Card.Body>
          <p>Are you sure you want to permanently delete customer?</p>

          <div>
            <label className="text-muted small">Name</label>
            <h5>{customer.name}</h5>

            <label className="mt-3 text-muted small">Surname</label>
            <h5>{customer.surname}</h5>

            <label className="mt-3 text-muted small">Email</label>
            <h5>{customer.email}</h5>
          </div>
        </Card.Body>
        <Card.Footer>
          <ButtonGroup className="w-100">
            <Button
              variant="danger"
              onClick={handleDelete}
              className="me-2 rounded-end"
            >
              <BsTrash className="me-2" />
              Confirm
            </Button>

            <Button
              variant="secondary"
              className="rounded-start"
              onClick={() => navigate(returnUrl)}
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

export default CustomerDelete;
