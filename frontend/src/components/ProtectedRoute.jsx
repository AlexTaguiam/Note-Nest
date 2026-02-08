import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthContext";
const ProtectedRoute = ({ children }) => {
  const { isLoading, currentUser } = useAuth();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return currentUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
