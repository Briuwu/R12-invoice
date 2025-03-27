import { Navigate, Outlet } from "react-router";

export default function AuthLayout() {
  const isAuthenticated = true;
  return isAuthenticated ? (
    <div>
      <header>header</header>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
}
