import { createStudentApi, editStudentApi } from "@/apis/student";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { StudentType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { z } from "zod";

// preprocess is used to handle empty string values and convert them to undefined
const studentFormSchema = z.object({
  name: z.string().min(1, "Name is required").or(z.literal("")).optional(),
  email: z.string().email("Invalid email").or(z.literal("")).optional(),
  cf_handle: z.string().min(1, "CF Handle is required"),
  phone: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .refine((val) => /^[0-9]+$/.test(val), {
      message: "Phone number must contain only digits",
    })
    .or(z.literal(""))
    .optional(),
});

export type StudentFormType = z.infer<typeof studentFormSchema>;

interface CreateAndEditStudentFormProps {
  editMode: boolean;
  student?: StudentType;
  setStudents: Dispatch<SetStateAction<StudentType[]>>;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreateAndEditStudentForm({
  editMode,
  student,
  setStudents,
  setDialogOpen,
}: CreateAndEditStudentFormProps) {
  const form = useForm<StudentFormType>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: student?.name || "",
      email: student?.email || "",
      cf_handle: student?.cf_handle || "",
      phone: student?.phone || "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const editStudent = async (values: StudentFormType) => {
    const res = await editStudentApi(student!._id, values);

    if (!res.success) {
      toast.error(res.message);
      console.error("Failed to edit student:", res.message);
      return;
    }

    toast.success("Student updated successfully");
    setStudents((prev) =>
      prev.map((currentStudent) =>
        student!._id === currentStudent._id
          ? { ...currentStudent, ...values }
          : currentStudent
      )
    );

    setDialogOpen(false);
  };
  const createStudent = async (values: StudentFormType) => {
    const res = await createStudentApi(values);

    if (!res.success) {
      toast.error(res.message);
      console.error("Failed to add student:", res.message);
      return;
    }

    toast.success("Student added successfully");
    setStudents((prev) => [...prev, res.data]);

    setDialogOpen(false);
  };

  const onSubmit = async (values: StudentFormType) => {
    if (editMode) {
      await editStudent(values);
    } else {
      await createStudent(values);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full p-4 space-y-3">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              name="cf_handle"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codeforces handle</FormLabel>
                  <FormControl>
                    <Input placeholder="CF Handle" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} className="mt-3" type="submit">
              {isSubmitting
                ? "Submitting..."
                : editMode
                ? "Update Student"
                : "Create Student"}
              <ClipLoader
                loading={isSubmitting}
                size={14}
                color="text-primary"
              />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
