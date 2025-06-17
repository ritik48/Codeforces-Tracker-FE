import type { StudentFormType } from "@/pages/Students/components/CreateAndEditStudentForm";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const fetchAllStudents = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/student?page=${page}&limit=${limit}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch students",
      };
    }

    return {
      success: true,
      data: data.data,
      totalPages: data.pagination.totalPages,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch students due to an error",
    };
  }
};

export const deleteStudent = async (studentId: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/student/${studentId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        message: data.message || "Failed to delete student",
      };
    }

    return { success: true, message: "Student deleted successfully" };
  } catch (error) {
    console.error("Failed to delete student:", error);
    return {
      success: false,
      message: "Failed to delete student due to an error",
    };
  }
};

export const createStudentApi = async (studentData: StudentFormType) => {
  try {
    const response = await fetch(`${BACKEND_URL}/student`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(studentData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to create student",
      };
    }

    return {
      success: true,
      data: data.data,
      message: "Student created successfully",
    };
  } catch (error) {
    console.error("Failed to create student:", error);
    return {
      success: false,
      message: "Failed to create student due to an error",
    };
  }
};

export const editStudentApi = async (
  studentId: string,
  studentData: StudentFormType
) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate network delay

    const response = await fetch(`${BACKEND_URL}/student/${studentId}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(studentData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to edit student",
      };
    }

    return {
      success: true,
      data: data.data,
      message: "Student edited successfully",
    };
  } catch (error) {
    console.error("Failed to edit student:", error);
    return {
      success: false,
      message: "Failed to edit student due to an error",
    };
  }
};
