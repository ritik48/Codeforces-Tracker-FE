import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Code, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <section className="py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge variant="secondary" className="px-3 py-1">
              <Code className="w-3 h-3 mr-1" />
              Codeforces Integration
            </Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Codeforces Tracker for Educators
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl my-4">
              Profile tracking. Monitor progress, analyze performance, and guide
              your students to competitive programming success.
            </p>
          </div>

          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" className="px-8">
              <Link to="/login">Get Started</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-20 sm:mt-40 px-4 sm:px-0">
            <div className="flex flex-col items-center space-y-2 text-center border rounded-2xl border-gray-200 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Student Management</h3>
              <p className="text-sm text-muted-foreground sm:w-full w-[90%]">
                Organize and manage your students with custom syncing options.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2 text-center border rounded-2xl border-gray-200 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Performance Analytics</h3>
              <p className="text-sm text-muted-foreground sm:w-full w-[90%]">
                Enhanced performance metrics from codeforces data.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2 text-center border rounded-2xl border-gray-200 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Progress Tracking</h3>
              <p className="text-sm text-muted-foreground sm:w-full w-[90%]">
                Monitor contest participation, rating changes, and
                problem-solving patterns
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
