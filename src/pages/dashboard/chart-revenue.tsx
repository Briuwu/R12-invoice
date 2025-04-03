"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  paid: {
    label: "Paid Invoice",
    color: "var(--chart-1)",
  },
  unpaid: {
    label: "Unpaid Invoice",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

type Props = {
  chartData: {
    month: string;
    paid: number;
    unpaid: number;
  }[];
};

export default function ChartRevenue({ chartData }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Invoice Revenue Overview</CardDescription>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
          }).format(chartData.reduce((acc, item) => acc + item.paid, 0))}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-[3/1]">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -16,
              right: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
              domain={[0, "dataMax"]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideIndicator />}
            />
            <Bar
              dataKey="paid"
              fill="var(--color-paid)"
              radius={[0, 0, 4, 4]}
              stackId={1}
            />
            <Bar
              dataKey="unpaid"
              fill="var(--color-unpaid)"
              radius={[4, 4, 0, 0]}
              stackId={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing total revenue for the year
        </div>
      </CardFooter>
    </Card>
  );
}
