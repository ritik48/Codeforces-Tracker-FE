const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.message || "Login failed" };
    }

    return { success: true, message: "Login successful" };
  } catch (error) {
    console.error("Login failed:", error);
    return { success: false, message: "Login failed due to an error" };
  }
};

export const logoutUser = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.message || "Logout failed" };
    }

    return { success: true, message: "Logout successful" };
  } catch (error) {
    console.error("Logout failed:", error);
    return { success: false, message: "Logout failed due to an error" };
  }
};

export const getAuthUser = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/user`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch user",
      };
    }

    return { success: true, user: data.user };
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return { success: false, message: "Failed to fetch user due to an error" };
  }
};

export const fetchCronApi = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/cron`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch cron time",
      };
    }

    return { success: true, cron_time: data.cron_time };
  } catch (error) {
    console.error("Failed to fetch cron time:", error);
    return {
      success: false,
      message: "Failed to fetch cron time due to an error",
    };
  }
};

export const updateCronApi = async (cron_time: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/cron`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({ cron_time }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to update cron time",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to update cron time:", error);
    return {
      success: false,
      message: "Failed to update cron time due to an error",
    };
  }
};
