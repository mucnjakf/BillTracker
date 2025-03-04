import { useEffect, useState } from "react";
import { useAuth } from "../../components/BtAuthProvider";
import AuthService from "../../services/AuthService";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import BtRowCol from "../../components/BtRowCol";
import { BsPen } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import BtBreadcrumb from "../../components/BtBreadcrumb";

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
      <BtBreadcrumb
        paths={[{ label: "Home", href: "/" }, { label: "Account" }]}
      />

      <h2 className="mb-3">Account</h2>

      <Card className="mb-3" style={{ width: "1000px" }}>
        <Card.Body>
          <Container>
            <BtRowCol
              columns={[
                { size: "col-12", label: "GUID", value: currentUser.guid },
              ]}
            />

            <BtRowCol
              columns={[
                { size: "col-4", label: "ID", value: currentUser.id },
                {
                  size: "col-8",
                  label: "Created",
                  value: new Date(currentUser.createdUtc).toLocaleString(),
                },
              ]}
            />

            <BtRowCol
              isLastRow={true}
              columns={[
                { size: "col-4", label: "Email", value: currentUser.email },
                { size: "col-4", label: "Name", value: currentUser.name },
                { size: "col-4", label: "Surname", value: currentUser.surname },
              ]}
            />
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
