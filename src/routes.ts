import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import Layout from "./layout";

const App = lazy(() => import("./App"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        lazy: async () => ({ Component: App }),
      },
    ],
  },
]);
