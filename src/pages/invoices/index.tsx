import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function InvoicesPage() {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Invoices</h1>
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
