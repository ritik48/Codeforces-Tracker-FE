import { useParams } from "react-router-dom";
import { Star, MessageCircle, RefreshCcw } from "lucide-react";

import { useEffect, useState } from "react";
import type { StudentType } from "@/types";
import { fetchStudentApi } from "@/apis/student";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ClipLoader } from "react-spinners";
import { EmailNotificationToggle } from "./EmailNotificationToggle";

export function StudentDetails() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<StudentType>();

  const fetchStudent = async () => {
    try {
      setError("");
      setLoading(true);
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
    <div className="rounded-2xl min-w-[280px] w-1/4 p-6 border dark:bg-[#181818] bg-[#efefef]">
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
                <h2 className="sm:text-2xl font-semibold">{data?.name}</h2>
              )}
              <p className="text-gray-500 dark:text-gray-400 sm:text-base text-xs">
                @{data?.cf_handle}
              </p>
              {data?.max_rank && data?.rank && (
                <p className="text-xs sm:text-sm mt-1 capitalize">
                  <span className="font-medium">{data?.rank}</span> (max:{" "}
                  {data?.max_rank})
                </p>
              )}
            </div>
          </div>
          <div className="mt-4 space-y-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <div className="flex flex-col items-start">
                <span className="text-muted-foreground font-medium">
                  Rating:{" "}
                </span>
                <span>
                  {data?.current_rating || 0} (max: {data?.max_rating || 0})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <RefreshCcw className="w-4 h-4" />
              <div className="flex flex-col items-start">
                <span className="text-muted-foreground font-medium">
                  Last Synced:
                </span>{" "}
                <span>
                  {data?.last_sync
                    ? new Date(data.last_sync).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <div className="flex flex-col items-start">
                <span className="text-muted-foreground font-medium">
                  Reminder Sent:
                </span>
                <span>{data?.reminder_count || 0}</span>
              </div>
            </div>
            <EmailNotificationToggle
              email={data?.email}
              id={id!}
              allow_email={Boolean(data?.allow_email)}
            />
          </div>
        </>
      )}
    </div>
  );
}
