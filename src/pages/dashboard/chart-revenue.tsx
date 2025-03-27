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

const chartData = [
  { month: "January", desktop: 0, mobile: 0 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 0, mobile: 0 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 20, mobile: 30 },
  { month: "July", desktop: 0, mobile: 0 },
  { month: "August", desktop: 132, mobile: 95 },
  { month: "September", desktop: 189, mobile: 225 },
  { month: "October", desktop: 302, mobile: 248 },
  { month: "November", desktop: 5, mobile: 50 },
  { month: "December", desktop: 328, mobile: 290 },
];

const chartConfig = {
  desktop: {
    label: "Paid Invoice",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Unpaid Invoice",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function ChartRevenue() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Invoice Revenue Overview</CardDescription>
        <CardTitle className="text-3xl font-bold tracking-tight">$45</CardTitle>
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
              dataKey="desktop"
              fill="var(--color-desktop)"
              radius={[0, 0, 4, 4]}
              stackId={1}
            />
            <Bar
              dataKey="mobile"
              fill="var(--color-mobile)"
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
