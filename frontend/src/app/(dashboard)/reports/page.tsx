"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Report } from "@/types/types";
import { getReq } from "../../../lib/axios-helpers/apiClient";
import { useSession } from "next-auth/react";
import { REPORT } from "../../../endpoints/report.endpoint";
export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<("New" | "Reviewed")[]>(
    []
  );
  const [reports] = useState<Report[]>([
    {
      id: "1",
      name: "Evelyn Morgan",
      address: "789 Elm St, Springfield",
      date: "Apr 5",
      status: "New",
    },
    {
      id: "2",
      name: "Timothy Martinez",
      address: "456 Oak Ave, Centerville",
      date: "Apr 30, 2024",
      status: "Reviewed",
    },

    {
      id: "3",
      name: "Sarah Johnson",
      address: "123 Maple Dr, Riverside",
      date: "Mar 30, 2024",
      status: "Reviewed",
    },
    {
      id: "4",
      name: "Alexander Dixon",
      address: "101 Pine Rd, Fairview",
      date: "Mar 28, 2024",
      status: "Reviewed",
    },
    {
      id: "5",
      name: "Sophia Carter",
      address: "555 Cedar Ln, Lakeside",
      date: "Mar 28, 2024",
      status: "New",
    },
  ]);
  const session = useSession()
  const token = session.data?.user.accessToken

  useEffect(() => {
    (async () => {
      try {
        const response = await getReq(REPORT,{},token);
        console.log(response)
      } catch (err) {
        console.error(err);
      }
    })();
  }, [token]);

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus.length === 0 || selectedStatus.includes(report.status);

    return matchesSearch && matchesStatus;
  });

  const newCount = reports.filter((r) => r.status === "New").length;
  const reviewedCount = reports.filter((r) => r.status === "Reviewed").length;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle className="text-2xl">REPORTS</CardTitle>

              <div className="relative w-full md:w-64">
                <Input
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute w-4 h-4 text-gray-400 left-3 top-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4 pt-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <Button variant="ghost" className="font-medium">
                  All {reports.length}
                </Button>
                <Button variant="ghost" className="font-medium">
                  New {newCount}
                </Button>
                <Button variant="ghost" className="font-medium">
                  Reviewed {reviewedCount}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Filter</span>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="new-filter"
                    checked={selectedStatus.includes("New")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedStatus([...selectedStatus, "New"]);
                      } else {
                        setSelectedStatus(
                          selectedStatus.filter((s) => s !== "New")
                        );
                      }
                    }}
                  />
                  <label
                    htmlFor="new-filter"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    New
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="reviewed-filter"
                    checked={selectedStatus.includes("Reviewed")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedStatus([...selectedStatus, "Reviewed"]);
                      } else {
                        setSelectedStatus(
                          selectedStatus.filter((s) => s !== "Reviewed")
                        );
                      }
                    }}
                  />
                  <label
                    htmlFor="reviewed-filter"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Reviewed
                  </label>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <AnimatePresence>
                {filteredReports.map((report) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="transition-shadow hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                          <div>
                            <h3 className="font-medium">{report.name}</h3>
                            <p className="text-sm text-gray-600">
                              {report.address}
                            </p>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">
                              {report.date}
                            </span>
                            <Badge
                              variant={
                                report.status === "New"
                                  ? "default"
                                  : "secondary"
                              }
                              className="min-w-[80px] justify-center"
                            >
                              {report.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredReports.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-8 text-center text-gray-500"
                >
                  No reports found matching your criteria
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
