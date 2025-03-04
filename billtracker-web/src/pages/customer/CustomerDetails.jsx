import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import CustomerService from "../../services/CustomerService";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/customers">Customers</Breadcrumb.Item>
        <Breadcrumb.Item active>Details</Breadcrumb.Item>
      </Breadcrumb>

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
    </>
  );
};

export default CustomerDetails;
