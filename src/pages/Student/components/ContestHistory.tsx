import { RatingChart } from "./RatingChart";

export function ContestHistory({ days }: { days: number }) {
  return (
    <div>
      <RatingChart days={days} />
    </div>
  );
}
