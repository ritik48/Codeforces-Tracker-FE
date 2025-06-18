import { AppWindowIcon, CodeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import { ContestHistory } from "./ContestHistory";

export function StudentDetailsTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "contest-history";

  const handleTabChange = (tab: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("tab", tab);
      return params;
    });
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="contest-history">Contest History</TabsTrigger>
          <TabsTrigger value="submission-data">Submission Data</TabsTrigger>
        </TabsList>
        <TabsContent value="contest-history">
          <ContestHistory />
        </TabsContent>
        <TabsContent value="submission-data">
          <div>Submission Data</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
