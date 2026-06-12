import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const role = localStorage.getItem("role");

  if (role !== "ROLE_ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;