// ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";


export function AdminProtectedRoute() {
    const { loading, session, isAdmin, user } = useAuth();
  
    if (loading) {
      return null; 
    }
  
    if (!user) {
      return <Navigate to="/admin/login" replace />;
    }
  
    if (user.email !== import.meta.env.VITE_ADMIN_EMAIL) {
        return <Navigate to="/" replace />;
      }
  
    return <Outlet />;
  }
  