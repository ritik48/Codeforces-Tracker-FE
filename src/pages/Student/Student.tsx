import { StudentDetails } from "./components/StudentDetails";
import { StudentDetailsTab } from "./components/StudentDetailTab";

export function Student() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-start sm:flex-row flex-col gap-4">
          <StudentDetails />
          <StudentDetailsTab />
        </div>
      </div>
    </div>
  );
}
