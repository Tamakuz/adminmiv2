"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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

const yearlyData = {
  "2018": [
    { gender: "laki", students: 4500, fill: "var(--color-laki)" },
    { gender: "perempuan", students: 3800, fill: "var(--color-perempuan)" },
  ],
  "2019": [
    { gender: "laki", students: 5100, fill: "var(--color-laki)" },
    { gender: "perempuan", students: 4200, fill: "var(--color-perempuan)" },
  ],
  "2020": [
    { gender: "laki", students: 5800, fill: "var(--color-laki)" },
    { gender: "perempuan", students: 4800, fill: "var(--color-perempuan)" },
  ],
  "2021": [
    { gender: "laki", students: 6200, fill: "var(--color-laki)" },
    { gender: "perempuan", students: 5100, fill: "var(--color-perempuan)" },
  ],
  "2022": [
    { gender: "laki", students: 6556, fill: "var(--color-laki)" },
    { gender: "perempuan", students: 5678, fill: "var(--color-perempuan)" },
  ],
  "2023": [
    { gender: "laki", students: 7000, fill: "var(--color-laki)" },
    { gender: "perempuan", students: 6100, fill: "var(--color-perempuan)" },
  ],
};

const chartConfig = {
  students: {
    label: "Mahasiswa",
  },
  laki: {
    label: "Laki-laki",
    color: "hsl(var(--chart-1))",
  },
  perempuan: {
    label: "Perempuan", 
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const PieGraph = () => {
  const [selectedYear, setSelectedYear] = React.useState<keyof typeof yearlyData>("2023");
  const chartData = yearlyData[selectedYear];

  const totalStudents = React.useMemo(() => {
    return chartData.reduce((acc: number, curr: { students: number }) => acc + curr.students, 0);
  }, [chartData]);

  const calculateGrowth = React.useMemo(() => {
    const currentYearIndex = Object.keys(yearlyData).indexOf(selectedYear);
    if (currentYearIndex <= 0) return 0;

    const previousYear = Object.keys(yearlyData)[currentYearIndex - 1] as keyof typeof yearlyData;
    const currentTotal = chartData.reduce((acc: number, curr: { students: number }) => acc + curr.students, 0);
    const previousTotal = yearlyData[previousYear].reduce((acc: number, curr: { students: number }) => acc + curr.students, 0);

    return Number(((currentTotal - previousTotal) / previousTotal * 100).toFixed(1));
  }, [selectedYear, chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <div className="flex w-full items-center justify-between">
          <div className="text-center">
            <CardTitle>Distribusi Mahasiswa</CardTitle>
            <CardDescription>Berdasarkan Jenis Kelamin</CardDescription>
          </div>
          <Select value={selectedYear} onValueChange={(value) => setSelectedYear(value as keyof typeof yearlyData)}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(yearlyData).map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="students"
              nameKey="gender"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalStudents.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Mahasiswa
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending {calculateGrowth > 0 ? "up" : "down"} by {Math.abs(calculateGrowth)}% dari tahun sebelumnya <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Menampilkan total mahasiswa tahun {selectedYear}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PieGraph;
