"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { fetchCronApi, updateCronApi } from "@/apis/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  convertToUtc,
  cronToDay,
  generateCron,
  getLocalTime,
  parseCronExpression,
} from "@/lib/utils";

export function CronEditor() {
  const [cron, setCron] = useState("");
  const [day, setDay] = useState("daily");
  const [time, setTime] = useState("22:00");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCron = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetchCronApi();

        if (!res.success) {
          setError(res.message || "Failed to fetch cron time");
          return;
        }

        //  the cron we get is utc based, we need to convert it to local time
        const parts = res.cron_time.trim().split(" ");
        const [minuteStr, hourStr, , , dayOfWeek] = parts;

        const minute = parseInt(minuteStr);
        const hour = parseInt(hourStr);

        // convert time to local time
        const [localMinute, localHour] = getLocalTime(minute, hour);

        const parsedCron = parseCronExpression(
          localMinute,
          localHour,
          dayOfWeek
        );

        const localCron = generateCron(
          `${localHour}:${localMinute}`,
          cronToDay[dayOfWeek]
        );

        setDay(parsedCron.day);
        setTime(parsedCron.time);
        setCron(localCron);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCron();
  }, []);

  const handleUpdate = async () => {
    // convert time to utc time
    // save utc based cron to db and display local cron in the UI
    const utcTime = convertToUtc(time);
    const utcCron = generateCron(utcTime, day);
    const localCron = generateCron(time, day);
    setSaving(true);
    try {
      const res = await updateCronApi(utcCron);

      if (!res.success) {
        toast.error(res.message || "Failed to update cron time");
        return;
      }

      setCron(localCron);
      toast.success("Cron time updated successfully");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="w-[90%] sm:w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Update Cron Time</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <p className="text-muted-foreground text-sm">
            Loading current cron...
          </p>
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : (
          <>
            <div>
              <Label className="text-sm text-muted-foreground">
                Current Cron
              </Label>
              <p className="font-mono mt-1">{cron}</p>
            </div>

            <div className="flex gap-4">
              <div className="grid gap-3">
                <Select value={day} onValueChange={setDay}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="sun">Sunday</SelectItem>
                    <SelectItem value="mon">Monday</SelectItem>
                    <SelectItem value="tue">Tuesday</SelectItem>
                    <SelectItem value="wed">Wednesday</SelectItem>
                    <SelectItem value="thu">Thursday</SelectItem>
                    <SelectItem value="fri">Friday</SelectItem>
                    <SelectItem value="sat">Saturday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={handleUpdate} disabled={saving}>
              {saving ? "Updating..." : "Update"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
