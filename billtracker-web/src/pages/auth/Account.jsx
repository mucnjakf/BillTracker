import { useEffect, useState } from "react";
import { useAuth } from "../../components/BtAuthProvider";
import AuthService from "../../services/AuthService";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsPen } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const Account = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const data = await AuthService.getUser(user.id);
      setCurrentUser(data);
    };

    getUser();
  }, [user.id]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Account</Breadcrumb.Item>
      </Breadcrumb>

      <h2 className="mb-3">Account</h2>

      <Card className="w-50 mb-3">
        <Card.Body>
          <Container>
            <Row className="mb-4">
              <Col>
                <label className="text-muted small">GUID</label>
                <h5>{currentUser.guid}</h5>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col className="col-4">
                <label className="text-muted small">ID</label>
                <h5>{currentUser.id}</h5>
              </Col>
              <Col>
                <label className="text-muted small">Created</label>
                <h5>{new Date(currentUser.createdUtc).toLocaleString()}</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <label className="text-muted small">Email</label>
                <h5>{currentUser.email}</h5>
              </Col>
              <Col>
                <label className="text-muted small">Name</label>
                <h5>{currentUser.name}</h5>
              </Col>
              <Col>
                <label className="text-muted small">Surname</label>
                <h5>{currentUser.surname}</h5>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>

      <Button variant="secondary" onClick={() => navigate(`update`)}>
        <BsPen className="me-2" />
        Update account
      </Button>
    </>
  );
};

export default Account;
