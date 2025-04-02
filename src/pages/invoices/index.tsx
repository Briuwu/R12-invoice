import { lazy, Suspense } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { LoaderCircle } from "lucide-react";

const AddInvoice = lazy(() => import("./add-invoice"));

export default function InvoicesPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Suspense fallback={<LoaderCircle className="animate-spin" />}>
          <AddInvoice />
        </Suspense>
      </div>
      <div className="mt-5">
        <DataTable
          columns={columns}
          data={[
            {
              id: "1",
              amount: 100,
              status: "success",
              email: "johndoe@email.com",
            },
            {
              id: "2",
              amount: 200,
              status: "pending",
              email: "janesmith@email.com",
            },
          ]}
        />
      </div>
    </div>
  );
}
