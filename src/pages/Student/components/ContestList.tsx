import { fetchContestDataApi } from "@/apis/student";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import type { ContestDataType } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  TrendingDownIcon,
  TrendingUp,
} from "lucide-react";
import { Pagination } from "@/components/Pagination";
import { ClipLoader } from "react-spinners";

interface ContestDataTypeExtended extends ContestDataType {
  ratingChange: number;
}

const contestTableHeader: {
  key: keyof ContestDataTypeExtended;
  label: string;
}[] = [
  { key: "contestName", label: "Contest Name" },
  { key: "ratingChange", label: "Rating Change" },
  { key: "rank", label: "Rank" },
  { key: "unsolvedProblems", label: "Unsolved Problems" },
];

export function ContestList({ days }: { days: number }) {
  const { id } = useParams();

  const [contestData, setContestData] = useState<ContestDataTypeExtended[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 2;

  const [sortField, setSortField] =
    useState<keyof ContestDataTypeExtended>("contestName");
  const [sortAscending, setSortAscending] = useState(true);

  const fetchContestData = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await fetchContestDataApi(id!, days, limit, page);
      console.log({ res });
      if (!res.success) {
        setError(res.message);
        return;
      }

      const modifiedData = res.data.map((contest: ContestDataTypeExtended) => ({
        ...contest,
        ratingChange: contest.newRating - contest.oldRating,
      }));

      setContestData(modifiedData);
      setTotalPages(res.totalPages);
    } catch (error) {
      setError("Failed to fetch contest data.");
      console.error("Failed to fetch contest data:", error);
    } finally {
      setLoading(false);
    }
  };

  // refetch when date and page changes
  useEffect(() => {
    fetchContestData();
  }, [days, page]);

  const handleSort = (field: keyof ContestDataTypeExtended) => {
    if (sortField === field) setSortAscending(!sortAscending);
    else {
      setSortField(field);
      setSortAscending(true);
    }
  };

  const sortedData = [...contestData].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];

    if (aVal === undefined || bVal === undefined) return 0;
    return sortAscending ? (aVal > bVal ? 1 : -1) : aVal < bVal ? 1 : -1;
  });

  return (
    <div className="my-10">
      {loading && (
        <ClipLoader loading={loading} size={16} color="text-primary" />
      )}
      {!error && !loading && (
        <div className="overflow-y-auto sm:mt-0 mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                {contestTableHeader.map(({ key, label }) => (
                  <TableHead
                    key={key}
                    className="cursor-pointer select-none"
                    onClick={() => handleSort(key)}
                  >
                    <div className="flex items-center gap-1">
                      {label}
                      {sortField === key &&
                        (sortAscending ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        ))}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedData.map((contest, _) => (
                <TableRow className="cursor-pointer py-6" key={contest._id}>
                  <TableCell className="py-3">
                    {contest.contestName || "-"}
                  </TableCell>
                  <TableCell className="py-3 flex items-center gap-2">
                    {contest.ratingChange}

                    {contest.ratingChange > 0 ? (
                      <TrendingUp className="text-green-500" size={15} />
                    ) : (
                      <TrendingDownIcon className="text-red-500" size={15} />
                    )}
                  </TableCell>
                  <TableCell className="py-3">{contest.rank || "-"}</TableCell>
                  <TableCell className="py-3">
                    {contest.unsolvedProblems}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {!error && !loading && (
        <div className="mt-10">
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      )}
    </div>
  );
}
