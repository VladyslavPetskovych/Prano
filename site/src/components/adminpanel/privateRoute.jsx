import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const user = useSelector((state) => state.auth.user); 

  if (!user || user.role !== "admin") {
 
    return <Navigate to="/" />;
  }

  return <Element {...rest} />;
};

export default PrivateRoute;
