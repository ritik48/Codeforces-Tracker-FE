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
import { generateCron, parseCronExpression } from "@/lib/utils";

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

        const parsedCron = parseCronExpression(res.cron_time);

        setDay(parsedCron.day);
        setTime(parsedCron.time);
        setCron(res.cron_time);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCron();
  }, []);

  const handleUpdate = async () => {
    const newCron = generateCron(time, day);
    setSaving(true);
    try {
      const res = await updateCronApi(newCron);

      if (!res.success) {
        toast.error(res.message || "Failed to update cron time");
        return;
      }

      setCron(newCron);
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
