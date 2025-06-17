import { Button } from "@/components/ui/button";
import type { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}

export function Pagination({ page, setPage, totalPages }: PaginationProps) {
  return (
    <div className="flex justify-between mt-4 gap-2">
      <span className="self-center text-sm">
        Page {page} of {totalPages}
      </span>
      <div className="space-x-4">
        {page > 1 && (
          <Button
            disabled={page <= 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            variant="outline"
          >
            Previous
          </Button>
        )}
        {page < totalPages && (
          <Button
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            variant="outline"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
