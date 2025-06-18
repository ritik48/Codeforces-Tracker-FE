import { fetchSubmissionDataApi } from "@/apis/student";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SubmissionStats } from "./SubmissionStats";
import { ClipLoader } from "react-spinners";
import { RatingBarChart } from "./RatingBarChart";
import { SubmissionHeatmap } from "./SubmissionHeatmap";

interface SubmissionDataType {
  mostDifficultProblem: number;
  totalSolvedProblems: number;
  averageRating: number;
  averageProblemPerDay: number;
  ratingBucketData: { rating: string; count: number }[];
  heatmap: { date: string; count: number }[];
}

export function SubmissionData({ days }: { days: number }) {
  const { id } = useParams();

  const [submissionData, setSubmissionData] = useState<SubmissionDataType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubmissionData = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await fetchSubmissionDataApi(id!, days);

      if (!res.success) {
        setError(res.message);
        return;
      }

      setSubmissionData(res.data);
    } catch (error) {
      setError("Failed to fetch submission data.");
      console.error("Failed to fetch submission data:", error);
    } finally {
      setLoading(false);
    }
  };

  // refetch when date and page changes
  useEffect(() => {
    fetchSubmissionData();
  }, [days]);

  return (
    <div className="mt-4 flex flex-col gap-4">
      {loading && (
        <ClipLoader loading={loading} size={16} color="text-primary" />
      )}
      {error && <p className="text-red-500">{error}</p>}
      {!error && !loading && (
        <>
          <SubmissionStats
            mostDifficultProblem={submissionData?.mostDifficultProblem}
            totalSolvedProblems={submissionData?.totalSolvedProblems || 0}
            averageRating={submissionData?.averageRating || 0}
            averageProblemPerDay={submissionData?.averageProblemPerDay || 0}
          />
          <RatingBarChart data={submissionData?.ratingBucketData || []} />

          <SubmissionHeatmap heatmap={submissionData?.heatmap || []} />
        </>
      )}
    </div>
  );
}
