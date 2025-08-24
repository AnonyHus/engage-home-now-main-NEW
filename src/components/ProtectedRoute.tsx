// AdminProtectedRoute.tsx
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useAutoLogout } from "../services/useAutoLogout"; // custom hook

export function AdminProtectedRoute() {
  const { loading, user, signOut } = useAuth();

  // Auto logout after 15 mins (900 seconds)
  useAutoLogout(900, signOut);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
