import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../src/components/AuthContext"; // adapte selon ton projet

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
