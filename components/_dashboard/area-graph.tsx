"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const chartData = [
  { year: "2018", laki: 4500, perempuan: 3800 },
  { year: "2019", laki: 5100, perempuan: 4200 },
  { year: "2020", laki: 5800, perempuan: 4800 },
  { year: "2021", laki: 6200, perempuan: 5100 },
  { year: "2022", laki: 6556, perempuan: 5678 },
  { year: "2023", laki: 7000, perempuan: 6100 },
];

const chartConfig = {
  laki: {
    label: "Laki-laki",
    color: "hsl(var(--chart-1))",
  },
  perempuan: {
    label: "Perempuan",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const AreaGraph = () => {
  const [startYear, setStartYear] = useState("2018");
  const [endYear, setEndYear] = useState("2023");

  const filteredData = chartData.filter(
    (data) => data.year >= startYear && data.year <= endYear
  );

  const calculateGrowth = () => {
    if (filteredData.length < 2) return 0;
    
    const latestTotal = filteredData[filteredData.length - 1].laki + filteredData[filteredData.length - 1].perempuan;
    const previousTotal = filteredData[filteredData.length - 2].laki + filteredData[filteredData.length - 2].perempuan;
    
    return Number(((latestTotal - previousTotal) / previousTotal * 100).toFixed(1));
  };

  const years = chartData.map(data => data.year);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Area Chart - Stacked</CardTitle>
            <CardDescription>
              Showing total students distribution
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={startYear} onValueChange={setStartYear}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Start Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={endYear} onValueChange={setEndYear}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="End Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[310px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="laki"
              type="natural"
              fill="var(--color-laki)"
              fillOpacity={0.4}
              stroke="var(--color-laki)"
              stackId="a"
            />
            <Area
              dataKey="perempuan"
              type="natural"
              fill="var(--color-perempuan)"
              fillOpacity={0.4}
              stroke="var(--color-perempuan)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending {calculateGrowth() > 0 ? "up" : "down"} by {Math.abs(calculateGrowth())}% from previous year <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {startYear} - {endYear}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AreaGraph;
