import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
type ParsedCron = {
  day: string; // "mon", "daily"
  time: string; //  "22:30"
};

export function parseCronExpression(cron: string): ParsedCron {
  const parts = cron.trim().split(" ");

  const [minuteStr, hourStr, , , dayOfWeek] = parts;
  const minute = parseInt(minuteStr);
  const hour = parseInt(hourStr);

  // Reverse map for day
  const dayMap: Record<string, string> = {
    "*": "daily",
    "0": "sun",
    "1": "mon",
    "2": "tue",
    "3": "wed",
    "4": "thu",
    "5": "fri",
    "6": "sat",
  };

  const day = dayMap[dayOfWeek] ?? "daily";

  // converts 1 to 01, 2 to 02, etc.
  const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;

  return {
    day,
    time: formattedTime,
  };
}

export const generateCron = (time: string, day: string) => {
  const daysMap: Record<string, string> = {
    daily: "*",
    sun: "0",
    mon: "1",
    tue: "2",
    wed: "3",
    thu: "4",
    fri: "5",
    sat: "6",
  };

  const [hour, minute] = time.split(":").map((x) => parseInt(x));
  const dayOfWeek = daysMap[day];
  return `${minute} ${hour} * * ${dayOfWeek}`;
};
