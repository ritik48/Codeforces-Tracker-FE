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
