import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Code, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Student Management",
    description:
      "Organize and manage your students with custom syncing options.",
    icon: Users,
  },
  {
    title: "Performance Analytics",
    description: "Enhanced performance metrics from codeforces data.",
    icon: TrendingUp,
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor contest participation, rating changes, and problem-solving patterns.",
    icon: Award,
  },
];

import { Calendar, User, Star, MessageCircle, Globe } from "lucide-react";

interface UserProfileProps {
  data: {
    firstName: string;
    lastName: string;
    handle: string;
    country: string;
    city?: string;
    organization?: string;
    contribution: number;
    friendOfCount: number;
    rating: number;
    maxRating: number;
    rank: string;
    maxRank: string;
    lastOnlineTimeSeconds: number;
    registrationTimeSeconds: number;
    avatar: string;
  };
}

export default function UserProfileCard({
  data,
}: {
  data: UserProfileProps["data"];
}) {
  const formatDate = (seconds: number) =>
    new Date(seconds * 1000).toLocaleDateString();

  return (
    <div className="max-w-md w-full rounded-2xl border shadow-lg p-6 bg-white dark:bg-zinc-900 dark:text-white">
      <div className="flex items-center gap-4">
        <img
          src={data.avatar}
          alt={data.handle}
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-semibold">
            {data.firstName} {data.lastName}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">@{data.handle}</p>
          <p className="text-sm mt-1 capitalize">
            <span className="font-medium">{data.rank}</span> (max:{" "}
            {data.maxRank})
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span>
            {data.city}, {data.country}
          </span>
        </div>
        {data.organization && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{data.organization}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4" />
          <span>
            Rating: {data.rating} (max: {data.maxRating})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>Contribution: {data.contribution}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>Friend of: {data.friendOfCount} users</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          <span>Last online: {formatDate(data.lastOnlineTimeSeconds)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>Registered: {formatDate(data.registrationTimeSeconds)}</span>
        </div>
      </div>
    </div>
  );
}

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
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 text-center border rounded-2xl dark:border-gray-700 border-gray-200 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground sm:w-full w-[90%]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* <UserProfileCard
          data={{
            lastName: "Garg",
            country: "India",
            lastOnlineTimeSeconds: 1749923761,
            city: "Faridabad",
            rating: 1166,
            friendOfCount: 3,
            titlePhoto: "https://userpic.codeforces.org/no-title.jpg",
            handle: "Tanush_Garg",
            avatar: "https://userpic.codeforces.org/no-avatar.jpg",
            firstName: "Tanush",
            contribution: 0,
            organization: "IIIT Hyderabad",
            rank: "newbie",
            maxRating: 1166,
            registrationTimeSeconds: 1723465404,
            maxRank: "newbie",
          }}
        /> */}
      </div>
    </section>
  );
}
