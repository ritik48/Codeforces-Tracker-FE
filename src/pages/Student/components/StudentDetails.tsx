import { useParams } from "react-router-dom";
import { Star, MessageCircle } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import type { StudentType } from "@/types";
import { fetchStudentApi } from "@/apis/student";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ClipLoader } from "react-spinners";

export function StudentDetails() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<StudentType>();

  const fetchStudent = async () => {
    try {
      setError("");
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await fetchStudentApi(id!);

      if (!res.success) {
        setError(res.message);
        return;
      }
      console.log({ res });
      setData(res.data);
    } catch (error) {
      setError("Failed to fetch student details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const avatarName =
    data?.name
      ?.split(" ")
      .map((n) => n[0].toUpperCase())
      .join("") || data?.cf_handle?.slice(0, 2).toUpperCase();

  return (
    <div className="rounded-2xl w-1/4 p-6 border dark:bg-[#181818] bg-[#efefef]">
      {loading && (
        <ClipLoader loading={loading} size={16} color="text-primary" />
      )}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <div className="flex items-center gap-4">
            <Avatar className="w-14 h-14">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{avatarName}</AvatarFallback>
            </Avatar>

            <div>
              {data?.name && (
                <h2 className="text-2xl font-semibold">{data?.name}</h2>
              )}
              <p className="text-gray-500 dark:text-gray-400">
                @{data?.cf_handle}
              </p>
              {data?.max_rank && data?.rank && (
                <p className="text-sm mt-1 capitalize">
                  <span className="font-medium">{data?.rank}</span> (max:{" "}
                  {data?.max_rank})
                </p>
              )}
            </div>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>
                Rating: {data?.current_rating || 0} (max:{" "}
                {data?.max_rating || 0})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>Last Synced: 06/01/2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
