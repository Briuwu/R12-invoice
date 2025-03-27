import { Navigate } from "react-router";

export default function AuthLayout() {
  const isAuthenticated = true;
  return isAuthenticated ? (
    <Navigate to="dashboard" />
  ) : (
    <Navigate to="/login" />
  );
}
