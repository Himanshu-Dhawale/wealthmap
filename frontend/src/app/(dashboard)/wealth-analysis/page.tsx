// const WealthAnalysisPage = () => {
//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-semibold">Wealth Analysis</h2>
//         <div className="flex space-x-3">
//           <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
//             Export
//           </button>
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
//             Generate Report
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Analysis Cards */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             Total Property Value
//           </h3>
//           <p className="text-3xl font-bold">₹24.7 Cr</p>
//           <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <h3 className="text-lg font-medium text-gray-900 mb-2">Top Owners</h3>
//           <p className="text-3xl font-bold">42</p>
//           <p className="text-sm text-gray-500 mt-2">With ₹1Cr+ portfolio</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             Growth Areas
//           </h3>
//           <p className="text-3xl font-bold">5</p>
//           <p className="text-sm text-gray-500 mt-2">
//             Neighborhoods with 20%+ YoY growth
//           </p>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-6">
//         <h3 className="text-lg font-medium text-gray-900 mb-4">
//           Wealth Distribution
//         </h3>
//         <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
//           [Wealth Distribution Chart]
//         </div>
//       </div>
//     </div>
//   );
// };
// export default WealthAnalysisPage;





import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { ChartNoAxesColumn, Download, LoaderCircle, Search, SearchIcon } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";

type WealthAnalysisResult = {
  name: string;
  email: string;
  totalNetWorth: number;
  confidenceLevel: "low" | "medium" | "high";
  wealthSource: string;
  lastUpdated: string;
};

export default function WealthAnalysisPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<WealthAnalysisResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Mock search function - replace with actual API call
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response - replace with actual API response
      const mockResponse: WealthAnalysisResult[] = [
        {
          name: "Emily Vanderbilt",
          email: "emily.v@vanderbilt.org",
          totalNetWorth: 680000,
          confidenceLevel: "medium",
          wealthSource: "Public Filings",
          lastUpdated: "2024-11-15T14:30:00Z"
        }
      ];
      
      setResults(mockResponse);
    } catch (err) {
      setError("Failed to fetch wealth analysis data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getConfidenceBadgeVariant = (level: string) => {
    switch (level) {
      case "high": return "success";
      case "medium": return "warning";
      case "low": return "destructive";
      default: return "outline";
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
            <SearchBar
              placeholder="Search by name, email, or company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <SearchIcon className="mr-2 h-4 w-4" />
              )}
              Search
            </Button>
          </div>

          {error && (
            <div className="rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
              {error}
            </div>
          )}
        </div>

        {results.length > 0 ? (
          <div className="grid gap-6">
            {results.map((result, index) => (
              <Card key={index} className="shadow-sm">
                <CardHeader className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{result.name}</CardTitle>
                    <Badge variant={getConfidenceBadgeVariant(result.confidenceLevel)}>
                      {result.confidenceLevel} confidence
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{result.email}</p>
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
                      <p className="text-sm">{formatDate(result.lastUpdated)}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-2">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export Report
                    </Button>
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
              {isLoading ? "" : "Search for an individual to view their wealth analysis"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}