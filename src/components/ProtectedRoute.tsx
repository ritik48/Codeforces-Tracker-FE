import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export function ProtectedRoute() {
  const { username, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="absolute inset-0 pt-[200px] bg-secondary flex justify-center">
        <ClipLoader loading={loading} size={30} color="text-primary" />
      </div>
    );
  }
  if (!username) {
    // to add redirect path to login page
    const currentPath = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirectTo=${currentPath}`} replace />;
  }

  return <Outlet />;
}
