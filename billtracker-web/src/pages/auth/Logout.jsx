import { useNavigate } from "react-router";
import { useAuth } from "../../components/BtAuthProvider";

const Logout = () => {
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  setAccessToken(null);
  navigate("/login");

  return;
};

export default Logout;
