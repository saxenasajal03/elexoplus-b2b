import React from 'react';
import { Navigate } from 'react-router-dom';
import { useB2BAuth } from '../context/B2BAuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, ready } = useB2BAuth();
  if (!ready) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}
