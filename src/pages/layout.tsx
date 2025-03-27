import { Outlet } from "react-router";

import { Header } from "@/components/header";

export default function Layout() {
  return (
    <div>
      <Header />
      <main className="p-5">
        <Outlet />
      </main>
    </div>
  );
}
