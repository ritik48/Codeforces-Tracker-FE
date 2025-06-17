import { Button } from "./ui/button";

export const NavBar = () => {
  return (
    <div className="border-b">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="font-bold">CF Management</div>

        <div>
          <Button size={"sm"}>Login</Button>
        </div>
      </div>
    </div>
  );
};
