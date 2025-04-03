import { useReceiptStore } from "@/stores/receipt-store";
import { LoaderCircle } from "lucide-react";
import { lazy, Suspense, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const DashboardCard = lazy(() => import("@/pages/dashboard/dashboard-card"));
const ChartRevenue = lazy(() => import("@/pages/dashboard/chart-revenue"));
const RecentInvoice = lazy(() => import("@/pages/dashboard/recent-invoice"));

export default function Dashboard() {
  const receipt = useReceiptStore((state) => state.receipt);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const filteredReceipts = receipt.filter(
    (item) => new Date(item.date).getFullYear() === selectedYear,
  );

  const totalPaid = filteredReceipts.filter(
    (item) => item.status === "success",
  ).length;
  const totalPending = filteredReceipts.filter(
    (item) => item.status === "pending",
  ).length;
  const totalRevenue = filteredReceipts.reduce((acc, item) => {
    if (item.status === "success") {
      return acc + Number(item.receiptTotal);
    }
    return acc;
  }, 0);
  const totalPendingRevenue = filteredReceipts.reduce((acc, item) => {
    if (item.status === "pending") {
      return acc + Number(item.receiptTotal);
    }
    return acc;
  }, 0);

  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const chartData = allMonths.map((month) => {
    const monthData = filteredReceipts.reduce(
      (acc, item) => {
        const itemDate = new Date(item.date);
        const itemMonth = itemDate.toLocaleString("default", { month: "long" });

        if (itemMonth === month) {
          if (item.status === "success") {
            acc.paid += Number(item.receiptTotal);
          } else if (item.status === "pending") {
            acc.unpaid += Number(item.receiptTotal);
          }
        }
        return acc;
      },
      { month, paid: 0, unpaid: 0 },
    );
    return monthData;
  });

  const years = [
    ...new Set(receipt.map((item) => new Date(item.date).getFullYear())),
  ];

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Label className="block text-sm font-medium">Select Year:</Label>
          <Select
            onValueChange={(value) => setSelectedYear(Number(value))}
            defaultValue={selectedYear.toString()}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={selectedYear.toString()} />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-auto">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-4">
        <Suspense fallback={<LoaderCircle className="animate-spin" />}>
          <DashboardCard
            title="Paid Invoice"
            total={totalPaid.toString()}
            className="bg-blue-500 text-white"
          />
        </Suspense>
        <Suspense fallback={<LoaderCircle className="animate-spin" />}>
          <DashboardCard
            title="Pending Invoice"
            total={totalPending.toString()}
            className="bg-yellow-500 text-white"
          />
        </Suspense>
        <Suspense fallback={<LoaderCircle className="animate-spin" />}>
          <DashboardCard
            title="Total Revenue"
            total={new Intl.NumberFormat("en-PH", {
              style: "currency",
              currency: "PHP",
            }).format(totalRevenue)}
            className="bg-emerald-500 text-white"
          />
        </Suspense>
        <Suspense fallback={<LoaderCircle className="animate-spin" />}>
          <DashboardCard
            title="Total Pending Revenue"
            total={new Intl.NumberFormat("en-PH", {
              style: "currency",
              currency: "PHP",
            }).format(totalPendingRevenue)}
            className="bg-red-500 text-white"
          />
        </Suspense>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <Suspense fallback={<LoaderCircle className="animate-spin" />}>
          <RecentInvoice receipt={filteredReceipts} />
        </Suspense>
        <Suspense fallback={<LoaderCircle className="animate-spin" />}>
          <ChartRevenue chartData={chartData} />
        </Suspense>
      </div>
    </section>
  );
}
