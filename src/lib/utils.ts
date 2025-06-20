import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
type ParsedCron = {
  day: string; // "mon", "daily"
  time: string; //  "22:30"
};

// Reverse map for day
export const cronToDay: Record<string, string> = {
  "*": "daily",
  "0": "sun",
  "1": "mon",
  "2": "tue",
  "3": "wed",
  "4": "thu",
  "5": "fri",
  "6": "sat",
};

export function parseCronExpression(
  minute: number,
  hour: number,
  dayOfWeek: string
): ParsedCron {
  const day = cronToDay[dayOfWeek] ?? "daily";

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
  const dayToCron: Record<string, string> = {
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
  const dayOfWeek = dayToCron[day];
  return `${minute} ${hour} * * ${dayOfWeek}`;
};

export const convertToUtc = (time: string) => {
  // Parse hour and minute
  const [hour, minute] = time.split(":").map(Number);

  // Create a dummy local Date (any day, just for time conversion)
  const local = new Date();
  local.setHours(hour);

  local.setMinutes(minute);

  // Convert to UTC hour and minute
  const utcHours = local.getUTCHours();
  const utcMinutes = local.getUTCMinutes();

  // Format back as HH:MM
  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${pad(utcHours)}:${pad(utcMinutes)}`;
};

export const getLocalTime = (minute: number, hour: number) => {
  const local = new Date();
  local.setUTCMinutes(minute);
  local.setUTCHours(hour);

  const localMinute = local.getMinutes();
  const localHour = local.getHours();

  return [localMinute, localHour];
};
