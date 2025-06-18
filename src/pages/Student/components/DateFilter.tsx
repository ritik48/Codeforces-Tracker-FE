import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Dispatch, SetStateAction } from "react";

interface DateFilterProps {
  days: number;
  setDays: Dispatch<SetStateAction<number>>;
}

export function DateFilter({ days, setDays }: DateFilterProps) {
  return (
    <div className="w-[180px]">
      <Select value={`${days}`} onValueChange={(d) => setDays(parseInt(d))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="30">Last 30 Days</SelectItem>
          <SelectItem value="90">Last 90 Days</SelectItem>
          <SelectItem value="365">Last 365 Days</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
