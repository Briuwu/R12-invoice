import { lazy, Suspense } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { LoaderCircle } from "lucide-react";
import { useReceiptStore } from "@/stores/receipt-store";

const AddInvoice = lazy(() => import("./add-invoice"));

export default function InvoicesPage() {
  const data = useReceiptStore((state) => state.receipt);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Suspense fallback={<LoaderCircle className="animate-spin" />}>
          <AddInvoice />
        </Suspense>
      </div>
      <div className="mt-5">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
