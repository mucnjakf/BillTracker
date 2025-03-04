import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import CustomerService from "../../services/CustomerService";
import { BsTrash, BsXCircle } from "react-icons/bs";

const CustomerDelete = () => {
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

  const handleDelete = async (e) => {
    e.preventDefault();

    await CustomerService.delete(customerId);
    navigate("/customers");
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/customers">Customers</Breadcrumb.Item>
        <Breadcrumb.Item active>Delete</Breadcrumb.Item>
      </Breadcrumb>

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

export default CustomerDelete;
