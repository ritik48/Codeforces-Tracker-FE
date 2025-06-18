import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

export function RatingBarChart({
  data,
}: {
  data: { rating: string; count: number }[];
}) {
  const chartConfig = {
    count: {
      label: "Problems Count",
      color: "#2563eb",
    },
  } as ChartConfig;

  const sortedData = data.sort((a, b) => {
    const getLowerBound = (range: string) => parseInt(range.split("-")[0]);
    return getLowerBound(a.rating) - getLowerBound(b.rating);
  });

  return (
    <div className="w-full border rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-semibold">
            Problems by rating
          </h2>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart data={sortedData}>
          <XAxis dataKey="rating" tickLine={false} tickMargin={10} />
          <YAxis tickLine={false} tickMargin={10} />
          <ChartLegend content={<ChartLegendContent />} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="count"
            fill="var(--color-count)"
            radius={4}
            name="Problems Count"
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
