import { createBrowserRouter } from "react-router";

import AuthLayout from "./auth-layout";
import App from "./App";
import LoginPage from "./pages/login";
import InvoicesPage from "./pages/invoices";
import InvoicePage from "./pages/invoice";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: App,
      },
      {
        path: "invoices",
        Component: InvoicesPage,
      },
      {
        path: "/invoices/:id",
        Component: InvoicePage,
      },
    ],
  },
  {
    path: "login",
    Component: LoginPage,
  },
]);
