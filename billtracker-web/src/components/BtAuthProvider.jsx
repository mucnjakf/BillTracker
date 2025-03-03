import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

function BtAuthProvider({ children }) {
  const [accessToken, setAccessToken_] = useState(
    localStorage.getItem("accessToken")
  );

  const setAccessToken = (newAccessToken) => setAccessToken_(newAccessToken);

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      localStorage.setItem("accessToken", accessToken);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  const contextValue = useMemo(
    () => ({
      accessToken,
      setAccessToken,
    }),
    [accessToken]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default BtAuthProvider;
