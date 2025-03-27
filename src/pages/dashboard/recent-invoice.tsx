import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RecentInvoice() {
  return (
    <Card className="max-h-[400px] overflow-hidden">
      <CardHeader>
        <CardTitle>Recent Invoice</CardTitle>
        <CardDescription>Showing 10 of 100 recent invoices</CardDescription>
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
  return (
    <li className="flex items-center justify-between py-5">
      <p className="font-bold uppercase">Invoice #123</p>
      <p className="text-xs opacity-75">johndoe@email.com</p>
      <p className="font-bold text-green-500">$45</p>
      <p className="flex items-center gap-2 rounded-md bg-yellow-100 p-2 text-xs font-bold text-yellow-500">
        <span className="block aspect-square w-1.5 rounded-full bg-yellow-500"></span>
        Pending
      </p>
    </li>
  );
}
