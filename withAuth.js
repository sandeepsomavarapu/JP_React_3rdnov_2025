// withAuth.js
import React from "react";
import { Navigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
