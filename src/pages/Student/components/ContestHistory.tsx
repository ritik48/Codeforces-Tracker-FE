import { useParams } from "react-router-dom";

export function ContestHistory() {
  const { id } = useParams();

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-2xl font-bold mb-4">Contest History</h1>
        <p className="text-gray-600">
          This page will display the contest history of the student.
        </p>
        {/* Add your contest history components here */}
      </div>
    </div>
  );
}
