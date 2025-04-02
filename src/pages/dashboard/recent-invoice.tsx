import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Receipt } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

type Props = {
  receipt: Receipt[];
};

export default function RecentInvoice({ receipt }: Props) {
  return (
    <Card className="max-h-[400px] overflow-hidden">
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Recent Invoice</CardTitle>
          <CardDescription>Showing 10 recent invoices</CardDescription>
        </div>
        <Button asChild variant="link" size="sm" className="text-sm opacity-50">
          <Link to="/dashboard/invoices">View All</Link>
        </Button>
      </CardHeader>
      <CardContent className="overflow-auto">
        <ul className="divide-y divide-gray-200">
          {receipt.map((item) => (
            <Invoice item={item} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function Invoice({ item }: { item: Receipt }) {
  const statusStyles = {
    success: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
  };
  return (
    <li className="grid grid-cols-5 items-center justify-items-center py-5">
      <p className="justify-self-start text-sm font-bold uppercase">
        #{item.invoiceNum}
      </p>
      <p className="text-xs text-red-500">
        {new Date(item.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </p>
      <p className="text-center text-sm opacity-75">{item.registeredName}</p>
      <p className="justify-self-end text-sm font-bold text-green-500">
        {new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(Number(item.receiptTotal))}
      </p>
      <p
        className={cn(
          "flex items-center gap-2 justify-self-end rounded-md p-2 text-xs font-bold tracking-wider uppercase",
          statusStyles[item.status as keyof typeof statusStyles],
        )}
      >
        {item.status}
      </p>
    </li>
  );
}
