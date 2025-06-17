import type { StudentType } from "@/types";
import { useState, type Dispatch, type SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateAndEditStudentForm } from "./CreateAndEditStudentForm";
import { Pencil } from "lucide-react";

interface CreateAndEditStudentProps {
  editMode: boolean;
  student?: StudentType;
  setStudents: Dispatch<SetStateAction<StudentType[]>>;
}

export function CreateAndEditStudentDialog({
  editMode,
  student,
  setStudents,
}: CreateAndEditStudentProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger onClick={(e) => e.stopPropagation()}>
        <Button variant={"outline"}>
          {editMode ? <Pencil size={15} /> : "Add Student"}
        </Button>
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>{editMode ? "Edit Student" : "Add Student"}</DialogTitle>
          <CreateAndEditStudentForm
            editMode={editMode}
            student={student}
            setStudents={setStudents}
            setDialogOpen={setDialogOpen}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
