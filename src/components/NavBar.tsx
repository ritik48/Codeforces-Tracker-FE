import { useAuth } from "@/hooks/useAuth";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Link, NavLink } from "react-router-dom";

export const NavBar = () => {
  const { username, logout, loading } = useAuth();

  return (
    <div className="border-b sticky top-0 z-10 bg-secondary">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center gap-6 sm:gap-20">
          <Link to={"/"} className="font-bold sm:block hidden">
            CF Management
          </Link>
          <Link to={"/"} className="font-bold sm:hidden block">
            CF
          </Link>
          {username && !loading && (
            <div className="flex gap-6 sm:gap-10">
              <NavLink
                to="/students"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Students
              </NavLink>
              <NavLink
                to="/setting"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Setting
              </NavLink>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {username && !loading && (
            <span className="sm:block hidden">Welcome👋, {username}</span>
          )}
          <ModeToggle />
          {!loading &&
            (username ? (
              <Button size="sm" variant="outline" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Button size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};
