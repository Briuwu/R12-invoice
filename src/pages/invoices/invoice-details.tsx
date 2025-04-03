import { Button } from "@/components/ui/button";
import { cn, statusStyles } from "@/lib/utils";
import { useReceiptStore } from "@/stores/receipt-store";
import { Link, useParams } from "react-router";

export default function InvoiceDetailsPage() {
  const { id } = useParams();
  const { getReceiptById } = useReceiptStore((state) => state);

  const invoice = getReceiptById(id as string);

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  return (
    <main className="mx-auto max-w-4xl space-y-5">
      <Button asChild>
        <Link to="/dashboard/invoices">Go Back</Link>
      </Button>
      <div className="flex items-center justify-between rounded bg-neutral-100 p-5 shadow">
        <p className="text-sm font-semibold capitalize">
          Status:{" "}
          <span
            className={cn(
              "w-fit items-center rounded-md p-2 font-bold tracking-wider capitalize",
              statusStyles[invoice.status as keyof typeof statusStyles],
            )}
          >
            {invoice.status}
          </span>
        </p>
        <Button className="rounded-full bg-blue-500 hover:scale-105">
          Mark As Paid
        </Button>
      </div>
      <div className="space-y-10 bg-neutral-100 p-5 shadow">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-bold opacity-50">#{invoice.invoiceNum}</p>
            <p className="text-2xl font-bold capitalize">
              {invoice.registeredName}
            </p>
            <p className="font-bold">TIN: {invoice.tinNumber}</p>
          </div>
          <p className="max-w-[125px] text-right font-semibold">
            {invoice.businessAddress}
          </p>
        </div>
        <div className="grid grid-cols-[.5fr_1fr]">
          <div className="space-y-5">
            <p className="text-xs font-bold uppercase">
              {invoice.isVAT ? "VAT Form" : "Non-VAT Form"}
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="cashSales"
                  name="cashSales"
                  checked={invoice.cashSales}
                />
                <span className="block text-xs uppercase">Cash Sales</span>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="chargeSales"
                  name="chargeSales"
                  checked={invoice.chargeSales}
                />
                <span className="block text-xs uppercase">Charge Sales</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="opacity-50">Invoice Date</p>
              <p className="font-bold">
                {new Date(invoice.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-4 items-center justify-items-center rounded bg-neutral-200 p-2 text-sm font-bold capitalize">
              <p className="text-xs font-bold">Item</p>
              <p className="text-xs font-bold">Price</p>
              <p className="text-xs font-bold">Quantity</p>
              <p className="text-xs font-bold">Total Amount</p>
            </div>
            <hr className="bg-neutral-300" />
            <div className="max-h-[300px] space-y-3 overflow-auto">
              {invoice.items.map((item) => (
                <div
                  key={item.name}
                  className="grid grid-cols-4 items-center justify-items-center rounded bg-neutral-200 p-2 text-sm font-bold capitalize"
                >
                  <p className="text-xs font-bold">{item.name}</p>
                  <p className="text-xs font-bold">{item.price}</p>
                  <p className="text-xs font-bold">{item.quantity}</p>
                  <p className="text-xs font-bold">{item.totalAmount}</p>
                </div>
              ))}
            </div>
            <div className="text-right">
              <p className="opacity-50">Invoice Total</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(Number(invoice.receiptTotal))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
