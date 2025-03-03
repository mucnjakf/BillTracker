import { Navigate, Outlet } from "react-router";
import { useAuth } from "../components/BtAuthProvider";

function ProtectedRotue() {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedRotue;
