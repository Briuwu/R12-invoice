import { Navigate, Outlet, useLoaderData } from "react-router";

import { Header } from "@/components/header";
import { useReceiptStore } from "@/stores/receipt-store";
import { useEffect } from "react";
import { Receipt } from "@/lib/types";
import { useAuth } from "@/hooks/use-auth";

export default function Layout() {
  const data: Receipt[] = useLoaderData();
  const { setReceipts } = useReceiptStore((state) => state);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setReceipts(
      data.sort((a, b) => {
        return (
          new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
        );
      }),
    );
  }, []);

  return (
    <div>
      <Header />
      <main className="p-5">
        {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
      </main>
    </div>
  );
}
