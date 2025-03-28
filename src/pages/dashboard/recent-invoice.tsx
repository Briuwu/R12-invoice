import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

export default function RecentInvoice() {
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
          <Invoice />
          <Invoice />
          <Invoice />
          <Invoice />
          <Invoice />
          <Invoice />
        </ul>
      </CardContent>
    </Card>
  );
}

function Invoice() {
  const statusStyles = {
    success: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
  };
  return (
    <li className="flex items-center justify-between py-5">
      <p className="font-bold uppercase">#1</p>
      <p className="text-xs text-red-500">Due: Jan 1, 2025</p>
      <p className="text-xs opacity-75">johndoe@email.com</p>
      <p className="text-sm font-bold text-green-500">$45</p>
      <p
        className={cn(
          "flex items-center gap-2 rounded-md p-2 text-xs font-bold capitalize",
          statusStyles["pending"],
        )}
      >
        Pending
      </p>
    </li>
  );
}
