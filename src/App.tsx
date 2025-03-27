import { lazy, Suspense } from "react";
const Dashboard = lazy(() => import("@/pages/dashboard"));

export default function App() {
  return (
    <div className="text-5xl font-bold">
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
