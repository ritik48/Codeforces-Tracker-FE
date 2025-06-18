import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="py-10 flex flex-col items-center justify-center gap-3">
          <h1 className="text-6xl font-bold text-destructive">404</h1>
          <p className="text-xl font-semibold text-foreground">
            Page Not Found
          </p>
          <p className="text-sm text-center text-muted-foreground sm:w-full w-[90%]">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button onClick={() => navigate("/")} className="mt-4">
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
