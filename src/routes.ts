import { createBrowserRouter } from "react-router";

import AuthLayout from "@/auth-layout";
import Layout from "@/pages/layout";

import App from "@/App";
import LoginPage from "@/pages/login";
import InvoicesPage from "@/pages/invoices";
import InvoiceDetailsPage from "@/pages/invoices/invoice-details";

export const router = createBrowserRouter([
  { path: "/", Component: AuthLayout },
  {
    path: "/dashboard",
    Component: Layout,
    children: [
      { index: true, Component: App },
      { path: "invoices", Component: InvoicesPage },
      { path: "invoices/:id", Component: InvoiceDetailsPage },
    ],
  },
  { path: "login", Component: LoginPage },
]);
