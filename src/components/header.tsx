import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

import logo from "@/assets/logo.png";

export const Header = () => {
  const { pathname } = useLocation();
  return (
    <header className="bg-white p-5 shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-3">
          <img src={logo} alt="" className="w-10" />
          <p className="text-xl font-bold">Invoice System</p>
        </Link>
        <ul className="flex items-center">
          <li>
            <Button
              asChild
              variant={"link"}
              className={cn({
                "font-bold": pathname === "/dashboard",
              })}
            >
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          </li>
          <li>
            <Button
              asChild
              variant={"link"}
              className={cn({
                "font-bold": pathname === "/dashboard/invoices",
              })}
            >
              <Link to="/dashboard/invoices">Invoices</Link>
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
};
