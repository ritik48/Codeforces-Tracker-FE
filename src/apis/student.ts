import type { StudentFormType } from "@/pages/AllStudents/components/CreateAndEditStudentForm";

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

export const fetchStudentApi = async (studentId: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/student/${studentId}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch student",
      };
    }

    return { success: true, data: data.data };
  } catch (error) {
    console.error("Failed to fetch student:", error);
    return {
      success: false,
      message: "Failed to fetch student due to an error",
    };
  }
};

export const fetchContestDataApi = async (
  studentId: string,
  days: number,
  limit?: number,
  page?: number
) => {
  const url = `${BACKEND_URL}/student/${studentId}/contest-history?days=${days}`;
  const finalUrl = limit && page ? `${url}&limit=${limit}&page=${page}` : url;
  try {
    const response = await fetch(finalUrl, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch contest data",
      };
    }

    return {
      success: true,
      data: data.data,
      totalPages: data.pagination.totalPages,
    };
  } catch (error) {
    console.error("Failed to fetch contest data:", error);
    return {
      success: false,
      message: "Failed to fetch contest data due to an error",
    };
  }
};

export const fetchSubmissionDataApi = async (
  studentId: string,
  days: number
) => {
  const url =
    BACKEND_URL + `/student/${studentId}/submission-data?days=${days}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch submission data",
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("Failed to fetch submission data:", error);
    return {
      success: false,
      message: "Failed to fetch submission data due to an error",
    };
  }
};

export const updateEmailApi = async (studentId: string, email: string, allow_email: boolean) => {
  try {
    const response = await fetch(`${BACKEND_URL}/student/${studentId}/email`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({ email, allow_email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to update email",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to update email:", error);
    return {
      success: false,
      message: "Failed to update email due to an error",
    };
  }
};
