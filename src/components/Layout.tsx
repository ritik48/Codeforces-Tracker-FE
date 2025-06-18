import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "./theme-provider";
import { NavBar } from "./NavBar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export const Layout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <div>
          <NavBar />
          <Outlet />
        </div>
      </AuthProvider>
      <Toaster position="top-right" offset={{ top: 60 }} />
    </ThemeProvider>
  );
};
