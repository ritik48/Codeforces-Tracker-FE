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
