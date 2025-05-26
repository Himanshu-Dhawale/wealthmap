"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import {
  ChartNoAxesColumn,
  LoaderCircle,
  Search,
  SearchIcon,
} from "lucide-react";
import { getReq } from "@/lib/axios-helpers/apiClient";
import { WealthAnalysisResult } from "@/types/types";
import { GET_OWNER } from "@/endpoints/owner.endpoint";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function WealthAnalysisPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<WealthAnalysisResult[]>([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    try {
      const res = await getReq<WealthAnalysisResult[]>(
        `${GET_OWNER}${searchQuery}`
      );
      console.log("res", res.data);
      setResults(res.data);
    } catch (err) {
      toast("Failed to fetch wealth analysis data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getConfidenceBadgeVariant = (level: string) => {
    switch (level) {
      case "high":
        return "#65a30d";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#dc2626";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Wealth Analysis</h1>
          <p className="text-sm text-muted-foreground">
            Search for individuals to analyze their wealth profile
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="    Search by name, email, or company"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  handleSearch();
                }
              }}
              className="w-full md:w-72"
            />

            <Button
              onClick={() => searchQuery.trim() && handleSearch()}
              disabled={isLoading}
            >
              {isLoading ? (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <SearchIcon className="mr-2 h-4 w-4" />
              )}
              Search
            </Button>
          </div>
        </div>

        {results.length > 0 ? (
          <div className="grid gap-6">
            {results.map((result, index) => (
              <Card key={index} className="shadow-sm">
                <CardHeader className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{result.name}</CardTitle>
                    <Badge
                      variant={"default"}
                      style={{
                        background: getConfidenceBadgeVariant(
                          result?.confidenceLevel
                        ),
                      }}
                    >
                      {result.confidenceLevel} confidence
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {result.email}
                  </p>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Net Worth
                      </p>
                      <p className="text-2xl font-semibold">
                        ${result.totalNetWorth.toLocaleString()}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Wealth Source
                      </p>
                      <p className="text-sm">{result.wealthSource}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Last Updated
                      </p>
                      <p className="text-sm">
                        {formatDate(result.lastUpdated)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-2">
                    <Button>
                      <ChartNoAxesColumn className="mr-2 h-4 w-4" />
                      Detailed Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-muted-foreground">
              {isLoading ? "Searching..." : "No results found"}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {isLoading
                ? ""
                : "Search for an individual to view their wealth analysis"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}