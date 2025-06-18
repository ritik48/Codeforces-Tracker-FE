import { Card, CardContent } from "@/components/ui/card";
import { Activity, Target, TrendingUp, Trophy } from "lucide-react";

export function SubmissionStats({
  mostDifficultProblem,
  totalSolvedProblems,
  averageRating,
  averageProblemPerDay,
}: {
  mostDifficultProblem: any;
  totalSolvedProblems: number;
  averageRating: number;
  averageProblemPerDay: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="">
        <CardContent className="p-0">
          <div className="text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">Max Rating Solved</p>
            <p className="font-bold ">{mostDifficultProblem?.rating}</p>
            <p className="text-xs text-[#6262ea] mt-1">
              {mostDifficultProblem?.name}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="text-center">
            <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">Total Solved</p>
            <p className="sm:text-2xl font-bold">{totalSolvedProblems}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="text-center">
            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">Avg Rating</p>
            <p className="sm:text-2xl font-bold">{averageRating}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="text-center">
            <Activity className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">Avg Prob Per Day</p>
            <p className="sm:text-2xl font-bold">{averageProblemPerDay}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
