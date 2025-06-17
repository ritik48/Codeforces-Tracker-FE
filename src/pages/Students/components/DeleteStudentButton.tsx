import { deleteStudent } from "@/apis/student";
import { Button } from "@/components/ui/button";
import type { StudentType } from "@/types";
import {
  useState,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
} from "react";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { Trash } from "lucide-react";

interface DeleteStudentButtonProps {
  studentId: string;
  setStudents: Dispatch<SetStateAction<StudentType[]>>;
}

export function DeleteStudentButton({
  studentId,
  setStudents,
}: DeleteStudentButtonProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    try {
      setDeleting(true);
      const res = await deleteStudent(studentId);

      if (!res.success) {
        toast.error(res.message || "Failed to delete student.");
        return;
      }
      toast.success("Student deleted successfully.");
      setStudents((prev) =>
        prev.filter((student) => student._id !== studentId)
      );
    } catch (error) {
      console.error("Failed to delete student:", error);
      toast.error("Failed to delete student. Please try again later.");
    } finally {
      setDeleting(false);
    }
  };
  return (
    <Button
      size="sm"
      variant="outline"
      disabled={deleting}
      onClick={(e) => handleDelete(e)}
    >
      <ClipLoader loading={deleting} size={14} color="text-primary" />
      <Trash size={14} color="red" />
    </Button>
  );
}
