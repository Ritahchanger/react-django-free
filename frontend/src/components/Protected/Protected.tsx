import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check if user is authenticated (this is just one example method)
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
