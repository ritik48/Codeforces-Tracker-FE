import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Pagination } from "../../../components/Pagination";
import { fetchAllStudents } from "@/apis/student";
import { useNavigate } from "react-router-dom";
import type { StudentType } from "@/types";
import { DeleteStudentButton } from "./DeleteStudentButton";
import { CreateAndEditStudentDialog } from "./CreateAndEditStudent";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const studentTableHeader: { key: keyof StudentType; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone Number" },
  { key: "cf_handle", label: "Codeforces Handle" },
  { key: "current_rating", label: "Current Rating" },
  { key: "max_rating", label: "Max Rating" },
  { key: "last_sync", label: "Last Synced" },
];

export function StudentTable() {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const limit = 10;

  const [sortField, setSortField] = useState<keyof StudentType>("name");
  const [sortAscending, setSortAscending] = useState(true);

  const fetchStudents = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await fetchAllStudents(page, limit);
      if (!res.success) {
        setError(res.message);
        return;
      }

      setStudents(res.data);
      setTotalPages(res.totalPages);
    } catch (error) {
      setError("Failed to fetch students. Please try again later.");
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  const handleSort = (field: keyof StudentType) => {
    if (sortField === field) setSortAscending(!sortAscending);
    else {
      setSortField(field);
      setSortAscending(true);
    }
  };

  const sortedData = [...students].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];

    if (aVal === undefined || bVal === undefined) return 0;
    return sortAscending ? (aVal > bVal ? 1 : -1) : aVal < bVal ? 1 : -1;
  });

  const downloadCSV = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/student/download`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to download");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "students.csv";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Download failed");
    }
  };

  return (
    <div className="">
      <div className="flex sm:flex-row items-start flex-col sm:gap-0 gap-3 sm:items-center sm:justify-between my-4 sm:my-4">
        <h2 className="text-2xl font-semibold">
          Students{" "}
          <span className="text-xs text-muted-foreground">
            ({students.length})
          </span>
        </h2>
        {!error && (
          <div className="flex gap-2">
            <CreateAndEditStudentDialog
              editMode={false}
              setStudents={setStudents}
            />
            <Button onClick={downloadCSV}>Download CSV</Button>
          </div>
        )}
      </div>

      {error && (
        <div className="mx-auto w-full">
          <p className="text-red-500 my-4">{error}</p>
          <Button disabled={loading} onClick={fetchStudents}>
            Refresh
          </Button>
        </div>
      )}
      {!error && (
        <div className="h-[calc(100vh-200px)_!important] overflow-y-auto sm:mt-0 mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                {studentTableHeader.map(({ key, label }) => (
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
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedData.map((student, _) => (
                <TableRow
                  className="cursor-pointer"
                  onClick={() => {
                    navigate(`/students/${student._id}`);
                  }}
                  key={student._id}
                >
                  <TableCell>{student.name || "-"}</TableCell>
                  <TableCell>{student.email || "-"}</TableCell>
                  <TableCell>{student.phone || "-"}</TableCell>
                  <TableCell>{student.cf_handle}</TableCell>
                  <TableCell>{student.current_rating || "-"}</TableCell>
                  <TableCell>{student.max_rating || "-"}</TableCell>
                  <TableCell>
                    {student.last_sync
                      ? new Date(student.last_sync).toLocaleString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <CreateAndEditStudentDialog
                        editMode={true}
                        setStudents={setStudents}
                        student={student}
                      />
                      <DeleteStudentButton
                        studentId={student._id}
                        setStudents={setStudents}
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {!error && (
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      )}
    </div>
  );
}
