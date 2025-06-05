// ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const user = localStorage.getItem('user');
  const location = useLocation();

  // If user is not authenticated, redirect to signup with the intended destination
  if (!user) {
    return <Navigate to="/signup" state={{ from: location.pathname }} replace />;
  }

  // If authenticated, render the protected component
  return <Outlet />;
};

export default ProtectedRoute;