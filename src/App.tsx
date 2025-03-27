import { LoaderCircle } from "lucide-react";
import { lazy, Suspense } from "react";
const Dashboard = lazy(() => import("@/pages/dashboard"));

export default function App() {
  return (
    <Suspense fallback={<LoaderCircle className="animate-spin" />}>
      <Dashboard />
    </Suspense>
  );
}
