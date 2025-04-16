import { Navigate } from "react-router";
import { useAuth } from "./hooks/use-auth";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Navigate to="dashboard" />
  ) : (
    <Navigate to="login" />
  );
}
