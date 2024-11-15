// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // If no user is logged in, redirect to the landing page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If the user is authenticated, render the requested component
  return children;
};

export default ProtectedRoute;
