import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // 1. Agar login hi nahi hai
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Agar Role match nahi hota
  if (allowedRole && user.role !== allowedRole) {
    // Admin ko admin dashboard bhej do, student ko student dashboard
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />;
  }

  return children;
};

export default ProtectedRoute;