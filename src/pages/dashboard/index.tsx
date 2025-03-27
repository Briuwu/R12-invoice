import { LoaderCircle } from "lucide-react";
import { lazy, Suspense } from "react";

const DashboardCard = lazy(() => import("@/pages/dashboard/dashboard-card"));
const ChartRevenue = lazy(() => import("@/pages/dashboard/chart-revenue"));
const RecentInvoice = lazy(() => import("@/pages/dashboard/recent-invoice"));

export default function Dashboard() {
  return (
    <section>
      <h1 className="text-xl font-bold uppercase">Dashboard</h1>
      <div className="mt-5 grid grid-cols-4 gap-4">
        <Suspense fallback={<LoaderCircle className="animate-spin" />}>
          <DashboardCard
            title="Revenue"
            total={"$1000"}
            className="bg-green-500 text-white"
          />
        </Suspense>
        <Suspense fallback={<LoaderCircle className="animate-spin" />}>
          <DashboardCard
            title="Paid Invoice"
            total={"50"}
            className="bg-blue-500 text-white"
          />
        </Suspense>
        <Suspense fallback={<LoaderCircle className="animate-spin" />}>
          <DashboardCard
            title="Unpaid Invoice"
            total={"50"}
            className="bg-red-500 text-white"
          />
        </Suspense>
        <Suspense fallback={<LoaderCircle className="animate-spin" />}>
          <DashboardCard
            title="Expense"
            total={"$500"}
            className="bg-yellow-500 text-white"
          />
        </Suspense>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <Suspense fallback={<LoaderCircle className="animate-spin" />}>
          <RecentInvoice />
        </Suspense>
        <Suspense fallback={<LoaderCircle className="animate-spin" />}>
          <ChartRevenue />
        </Suspense>
      </div>
    </section>
  );
}
