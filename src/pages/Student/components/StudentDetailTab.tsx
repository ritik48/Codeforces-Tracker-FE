import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import { ContestHistory } from "./ContestHistory";
import { DateFilter } from "./DateFilter";
import { useState } from "react";
import { SubmissionData } from "./SubmissionData";

export function StudentDetailsTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "contest-history";
  const [days, setDays] = useState(30);

  const handleTabChange = (tab: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("tab", tab);
      return params;
    });
  };

  return (
    <div className="w-full gap-2 overflow-hidden">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="flex w-fit flex-wrap gap-3">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="contest-history">Contest History</TabsTrigger>
            <TabsTrigger value="submission-data">Submission Data</TabsTrigger>
          </TabsList>
          <DateFilter days={days} setDays={setDays} />
        </div>
        <div className="">
          <TabsContent value="contest-history" className="">
            <ContestHistory days={days} />
          </TabsContent>
          <TabsContent value="submission-data">
            <SubmissionData days={days} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
