//@ts-ignore
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

export function SubmissionHeatmap({
  heatmap,
}: {
  heatmap: { date: string; count: number }[];
}) {
  const endDate = new Date();
  const startDate = subDays(endDate, 365);

  return (
    <div className="border rounded-md pt-4 pb-2 px-4">
      <h3 className="my-2">Submission Heatmap</h3>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={heatmap || []}
        showWeekdayLabels={true}
        classForValue={(value: any) => {
          if (!value || value.count === 0) return "color-empty";
          if (value.count < 3) return "color-scale-1";
          if (value.count < 6) return "color-scale-2";
          if (value.count < 9) return "color-scale-3";
          return "color-scale-4";
        }}
        transformDayElement={(rect: any, value: any) => {
          const tooltipText = value?.date
            ? `${value.date}: ${value.count} submissions`
            : "No submissions";

          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {React.cloneElement(rect, {
                    rx: 2,
                    ry: 2,
                  })}
                </TooltipTrigger>
                <TooltipContent side="top">{tooltipText}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        }}
      />
    </div>
  );
}
