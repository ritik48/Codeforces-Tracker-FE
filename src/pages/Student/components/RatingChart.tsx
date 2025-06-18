import { fetchContestDataApi } from "@/apis/student";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { ClipLoader } from "react-spinners";
import type { ContestDataType } from "@/types";

export function RatingChart({ days }: { days: number }) {
  const { id } = useParams();

  const [contestData, setContestData] = useState<ContestDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchContestData = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await fetchContestDataApi(id!, days);
      console.log({ res });
      if (!res.success) {
        setError(res.message);
        return;
      }
      setContestData(res.data);
    } catch (error) {
      setError("Failed to fetch contest data.");
      console.error("Failed to fetch contest data:", error);
    } finally {
      setLoading(false);
    }
  };

  // refetch when date filter changes
  useEffect(() => {
    fetchContestData();
  }, [days]);

  const chartConfig = {
    newRating: {
      label: "Rating",
      color: "#2563eb",
    },
  } as ChartConfig;

  const totalContests = contestData.length;

  const ratingChange =
    contestData.length > 0
      ? contestData[totalContests - 1].newRating - contestData[0].newRating
      : 0;

  return (
    <div className="w-full border rounded-xl p-4 shadow-sm">
      <div className="flex">
        {loading && (
          <ClipLoader
            loading={loading}
            size={20}
            color="text-primary"
            className="mx-auto"
          />
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h2 className="sm:text-lg font-semibold">Rating Progress</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Last {totalContests} contests
            </p>
          </div>
          <div className="flex gap-4 text-xs sm:text-sm text-muted-foreground">
            <div>
              Change:{" "}
              <span
                className={`font-medium ${
                  ratingChange >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {ratingChange >= 0 ? "+" : ""}
                {ratingChange}
              </span>
            </div>
            <div>
              Final Rating:{" "}
              <span className="font-medium">
                {contestData[totalContests - 1]?.newRating}
              </span>
            </div>
          </div>
        </div>
      )}

      {!error && !loading && (
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={contestData}>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              }
            />
            <YAxis dataKey="newRating" tickLine={false} tickMargin={10} />
            <ChartTooltip
              labelFormatter={(label) =>
                new Date(label).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              }
              content={<ChartTooltipContent />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              name="New Rating"
              dataKey={"newRating"}
              stroke="var(--color-newRating)"
            />
          </LineChart>
        </ChartContainer>
      )}
    </div>
  );
}
