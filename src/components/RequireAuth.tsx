import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/admin/login" />;
};
