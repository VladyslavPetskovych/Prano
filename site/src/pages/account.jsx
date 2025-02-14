import React from 'react'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function account() {

  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);

  if (!isAuth) {
    return <Navigate to="/login" />; 
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center">Account</h2>
      <p className="mt-4 text-center">Welcome, {user?.email}!</p>
    </div>
  </div>
  )
}

export default account