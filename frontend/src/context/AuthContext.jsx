import { createContext, useContext, useEffect, useState } from "react";
import { login as loginService, logout as logoutService } from "../services/authService";
import { getAuthSession } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getAuthSession());

  useEffect(() => {
    setAuth(getAuthSession());
  }, []);

  const login = async (credentials) => {
    await loginService(credentials);
    setAuth(getAuthSession());
  };

  const logout = () => {
    logoutService();
    setAuth(getAuthSession());
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;