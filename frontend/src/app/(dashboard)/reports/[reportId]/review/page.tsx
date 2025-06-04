"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { patchReq } from "@/lib/axios-helpers/apiClient";
import { REPORTS } from "@/endpoints/report.endpoint";
import { LoaderCircle, ArrowLeft, Download, Printer } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Report } from "@/types/types";

export default function ViewReportPage() {
  const params = useParams();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const session = useSession();
  const token = session.data?.user.accessToken;
  const router = useRouter();

  const fetchReport = async () => {
    try {
      const response = await patchReq<{ report: Report }>(
        `${REPORTS}/${params.reportId}/review`,
        {},
        token
      );
      if (response.status === 200) {
        setReport(response.data.report);
      }
    } catch (error) {
      toast.error("Failed to fetch report");
      console.error(error);
      router.push("/reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session.data?.user) {
      fetchReport();
    }
  }, [session.data?.user, params.reportId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-lg">Report not found</p>
        <Button onClick={() => router.push("/reports")}>Back to Reports</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header with back button and actions */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.push("/reports")}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Reports
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Export
            </Button>
            <Button variant="outline" className="gap-2">
              <Printer size={16} />
              Print
            </Button>
          </div>
        </div>

        {/* Main Report Card */}
        <Card className="shadow-lg">
          <CardHeader className="border-b">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-2xl">{report.fullName}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Created on {formatDate(report.createdAt)}
                </p>
              </div>
              <Badge
                variant={report.status === "NEW" ? "default" : "secondary"}
                className="self-start sm:self-center"
              >
                {report.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-8">
            {/* Basic Information Section */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Primary Location
                    </p>
                    <p>{report.primaryLocation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Contact Email
                    </p>
                    <p>{report.contactEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Primary Industry
                    </p>
                    <p>{report.primaryIndustry}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Wealth Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Estimated Net Worth
                    </p>
                    <p className="text-xl font-semibold">
                      ${report.estimatedNetWorth?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Source of Wealth
                    </p>
                    <p>{report.sourceOfWealth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Confidence Score
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${report.confidenceScore}%` }}
                        ></div>
                      </div>
                      <span>{report.confidenceScore}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Information Section */}
            <div>
              <h3 className="text-lg font-medium mb-4">Property Information</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                {report.propertyTypes?.map((type) => (
                  <Badge key={type} variant="outline" className="text-center">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div>
              <h3 className="text-lg font-medium mb-4">Description</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="whitespace-pre-line">{report.description}</p>
              </div>
            </div>

            {/* Property Details Section */}
            <div>
              <h3 className="text-lg font-medium mb-4">Property Details</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="whitespace-pre-line">{report.propertyDetails}</p>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  Last Contact Date
                </p>
                <p>
                  {report.lastContactDate
                    ? formatDate(report.lastContactDate)
                    : "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p>{formatDate(report.updatedAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          {report.status === "NEW" && (
            <Button onClick={() => toast.success("Marked as reviewed")}>
              Mark as Reviewed
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}