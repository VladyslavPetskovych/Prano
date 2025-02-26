import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// PrivateRoute checks if the user is authenticated
const PrivateRoute = ({ element: Element, ...rest }) => {
  const user = useSelector((state) => state.auth.user); // Assuming user is in redux store

  if (!user || user.role !== "admin") {
    // If the user is not authenticated or authorized, redirect to login page
    return <Navigate to="/login" />;
  }

  // If the user is authenticated and authorized, render the component
  return <Element {...rest} />;
};

export default PrivateRoute;
