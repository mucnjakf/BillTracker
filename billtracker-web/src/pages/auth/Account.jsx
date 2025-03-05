import AuthService from "../../services/AuthService";
import Container from "react-bootstrap/Container";
import BtRowCol from "../../components/BtRowCol";
import BtBreadcrumb from "../../components/BtBreadcrumb";
import BtIconButton from "../../components/BtIconButton";
import BtPageTitle from "../../components/BtPageTitle";
import BtCard from "../../components/BtCard";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/BtAuthProvider";
import { BsPen } from "react-icons/bs";
import { useNavigate } from "react-router";

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

      <BtPageTitle text="Account" />

      <BtCard width="1000px" className="mb-3">
        <BtCard.Body>
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
        </BtCard.Body>
      </BtCard>

      <BtIconButton
        variant="secondary"
        onClick={() => navigate("update")}
        icon={BsPen}
        label="Update account"
      />
    </>
  );
};

export default Account;
