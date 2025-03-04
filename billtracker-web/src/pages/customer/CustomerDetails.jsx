import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import CustomerService from "../../services/CustomerService";
import BtBreadcrumb from "../../components/BtBreadcrumb";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { BsTrash, BsPen } from "react-icons/bs";

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
            <Row className="mb-4">
              <Col className="col-12">
                <label className="text-muted small">GUID</label>
                <h5>{customer.guid}</h5>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col className="col-4">
                <label className="text-muted small">ID</label>
                <h5>{customer.id}</h5>
              </Col>
              <Col className="col-8">
                <label className="text-muted small">Created</label>
                <h5>{new Date(customer.createdUtc).toLocaleString()}</h5>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col className="col-4">
                <label className="text-muted small">Name</label>
                <h5>{customer.name}</h5>
              </Col>
              <Col className="col-8">
                <label className="text-muted small">Surname</label>
                <h5>{customer.surname}</h5>
              </Col>
            </Row>

            <Row>
              <Col className="col-4">
                <label className="text-muted small">Email</label>
                <h5>{customer.email}</h5>
              </Col>
              <Col className="col-4">
                <label className="text-muted small">Telephone</label>
                <h5>{customer.telephone}</h5>
              </Col>
              <Col className="col-4">
                <label className="text-muted small">City</label>
                <h5>{customer.cityName}</h5>
              </Col>
            </Row>
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
