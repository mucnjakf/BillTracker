import { useEffect, useState } from "react";
import { useAuth } from "../../components/BtAuthProvider";
import AuthService from "../../services/AuthService";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MyAccount = () => {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const data = await AuthService.getUser(user.id);
      setCurrentUser(data);

      console.log(data);
    };

    getUser();
  }, [user.id]);

  return (
    <>
      <h2 className="mb-3">My account</h2>

      <Card className="w-50">
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
    </>
  );
};

export default MyAccount;
