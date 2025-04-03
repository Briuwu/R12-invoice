import { useReceiptStore } from "@/stores/receipt-store";
import { LoaderCircle } from "lucide-react";
import { lazy, Suspense } from "react";

const DashboardCard = lazy(() => import("@/pages/dashboard/dashboard-card"));
const ChartRevenue = lazy(() => import("@/pages/dashboard/chart-revenue"));
const RecentInvoice = lazy(() => import("@/pages/dashboard/recent-invoice"));

export default function Dashboard() {
  const receipt = useReceiptStore((state) => state.receipt);

  const totalPaid = receipt.filter((item) => item.status === "success").length;
  const totalPending = receipt.filter(
    (item) => item.status === "pending",
  ).length;
  const totalRevenue = receipt.reduce((acc, item) => {
    if (item.status === "success") {
      return acc + Number(item.receiptTotal);
    }
    return acc;
  }, 0);
  const totalPendingRevenue = receipt.reduce((acc, item) => {
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
    const monthData = receipt.reduce(
      (acc, item) => {
        const itemMonth = new Date(item.date).toLocaleString("default", {
          month: "long",
        });
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

  return (
    <section>
      <h1 className="text-2xl font-bold uppercase">Dashboard</h1>
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
          <RecentInvoice receipt={receipt} />
        </Suspense>
        <Suspense fallback={<LoaderCircle className="animate-spin" />}>
          <ChartRevenue chartData={chartData} />
        </Suspense>
      </div>
    </section>
  );
}
