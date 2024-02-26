import React from "react";
import { Outlet, Navigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
// import { useAuth } from "./AuthProvider";

const ProtectedRoute = () => {
  // const { user } = useAuth();
  const user = useSelector(state => state.user);

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
