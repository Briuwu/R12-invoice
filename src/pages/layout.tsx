import { Outlet } from "react-router";

import { Header } from "@/components/header";

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
