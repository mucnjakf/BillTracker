import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const BtAuthProvider = ({ children }) => {
  const [accessToken, setAccessToken_] = useState(
    localStorage.getItem("accessToken")
  );

  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  const setAccessToken = (newAccessToken) => {
    setAccessToken_(newAccessToken);

    if (newAccessToken) {
      const decoded = jwtDecode(newAccessToken);
      const userData = {
        id: decoded.sub,
        email: decoded.email,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  const contextValue = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      user,
    }),
    [accessToken, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default BtAuthProvider;
