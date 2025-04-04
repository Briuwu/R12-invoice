import { updateReceipt } from "@/appwrite";
import { Button } from "@/components/ui/button";
import { cn, statusStyles, VAT, formatCurrency } from "@/lib/utils";
import { useReceiptStore } from "@/stores/receipt-store";
import { useTransition } from "react";
import { Link, useParams } from "react-router";

export default function InvoiceDetailsPage() {
  const [isPending, startTransition] = useTransition();
  const { id } = useParams();
  const { getReceiptById } = useReceiptStore((state) => state);

  const invoice = getReceiptById(id as string);

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  const total = invoice.items.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0,
  );
  const VATAmount = invoice.isVAT ? total * VAT : 0;
  const totalWithVAT = invoice.isVAT ? total + VATAmount : total;
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(total);

  const markAsPaid = () => {
    startTransition(async () => {
      try {
        await updateReceipt(invoice.$id, {
          status: "success",
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    });
  };

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
        <div className="space-x-5">
          <Button
            disabled={isPending}
            onClick={markAsPaid}
            className="rounded-full bg-blue-500 hover:scale-105"
          >
            Mark As Paid
          </Button>
          <Button className="rounded-full bg-emerald-500 hover:scale-105">
            Print Invoice
          </Button>
        </div>
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
            <p className="font-bold uppercase">
              {invoice.isVAT ? "VAT Form" : "Non-VAT Form"}
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="cashSales"
                  name="cashSales"
                  checked={invoice.cashSales}
                  disabled
                />
                <span className="block text-xs uppercase">Cash Sales</span>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="chargeSales"
                  name="chargeSales"
                  checked={invoice.chargeSales}
                  disabled
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
            <div className="space-y-2">
              <p className="opacity-50">Due Date</p>
              <p className="font-bold text-red-500">
                {invoice.due
                  ? new Date(invoice.due).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-5 items-center justify-items-center rounded bg-neutral-200 p-2 text-center text-sm font-bold capitalize">
              <p className="text-xs font-bold">Item</p>
              <p className="text-xs font-bold">Price</p>
              <p className="text-xs font-bold">Quantity</p>
              <p className="text-xs font-bold">UOM</p>
              <p className="text-xs font-bold">Total Amount</p>
            </div>
            <hr className="bg-neutral-300" />
            <div className="scrollbar max-h-[300px] space-y-3 overflow-auto">
              {invoice.items.map((item) => (
                <div
                  key={item.name}
                  className="grid grid-cols-5 items-center justify-items-center rounded bg-neutral-200 p-2 text-center text-sm font-bold capitalize"
                >
                  <p className="text-xs font-bold">{item.name}</p>
                  <p className="text-xs font-bold">
                    {formatCurrency(Number(item.price))}
                  </p>
                  <p className="text-xs font-bold">{item.quantity}</p>
                  <p className="text-xs font-bold">{item.uom}</p>
                  <p className="text-xs font-bold">
                    {formatCurrency(Number(item.totalAmount))}
                  </p>
                </div>
              ))}
            </div>
            <hr className="bg-neutral-300" />
            <div className="text-right">
              <div className="grid grid-cols-2 items-center justify-center gap-3">
                <p className="text-xs font-bold uppercase">Total Sales:</p>
                <p className="text-sm font-bold text-emerald-500">
                  {total ? formatted : "₱0.00"}
                </p>
                {invoice.isVAT && (
                  <>
                    <p className="text-xs font-bold uppercase">
                      Less: VAT ({VAT * 100}%):
                    </p>
                    <p className="text-xs font-bold text-red-500">
                      {formatCurrency(VATAmount)}
                    </p>
                  </>
                )}
                <p className="text-xs font-bold uppercase">Less: Discount:</p>
                <p className="text-xs font-bold text-red-500">₱0.00</p>

                <p className="text-xs font-bold uppercase">
                  Less: Witholding Tax:
                </p>
                <p className="text-xs font-bold text-red-500">₱0.00</p>
                <hr className="col-span-full border-black" />
                <p className="text-xs font-bold uppercase">Total Amount Due:</p>
                <p className="text-lg font-bold text-emerald-500">
                  {invoice.isVAT
                    ? formatCurrency(totalWithVAT)
                    : formatCurrency(total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
