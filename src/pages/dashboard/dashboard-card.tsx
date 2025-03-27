import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

type Props = {
  title: string;
  total: string;
  className?: string;
};

export default function DashboardCard({ title, total, className }: Props) {
  return (
    <Card className={cn("py-5 shadow", className)}>
      <CardHeader>
        <CardTitle className="font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{total}</div>
      </CardContent>
    </Card>
  );
}
