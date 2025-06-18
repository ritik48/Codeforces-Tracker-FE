import { useAuth } from "@/hooks/useAuth";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const { username, logout } = useAuth();
  return (
    <div className="border-b">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center gap-6 sm:gap-20">
          <Link to={"/"} className="font-bold sm:block hidden">
            CF Management
          </Link>
          <Link to={"/"} className="font-bold sm:hidden block">
            CF
          </Link>
          <Link
            to="/students"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Students
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {username && (
            <span className="text-xs sm:block hidden">
              Welcome👋, {username}
            </span>
          )}
          <ModeToggle />
          {username ? (
            <Button size={"sm"} variant={"outline"} onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button size={"sm"}>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
