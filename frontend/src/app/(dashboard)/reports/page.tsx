"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ContactStatus, Report } from "@/types/types";
import { getReq } from "../../../lib/axios-helpers/apiClient";
import { useSession } from "next-auth/react";
import { REPORTS } from "../../../endpoints/report.endpoint";
import { LoaderCircle, Plus, Search } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<ContactStatus[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const session = useSession();
  const token = session.data?.user.accessToken;

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await getReq<{ reports: Report[] }>(REPORTS, {}, token);
      if (response.status === 200) {
        setReports(response?.data.reports);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session.data?.user) {
      fetchReports();
    }
  }, [token]);

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.primaryLocation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus.length === 0 || selectedStatus.includes(report.status);

    return matchesSearch && matchesStatus;
  });

  const newCount = reports.filter((r) => r.status === "NEW").length;
  const reviewedCount = reports.filter((r) => r.status === "REVIEWED").length;

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
              <div className="flex gap-3">
                <div className="relative w-full md:w-64">
                  <Input
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                  <Search className="absolute w-4 h-4 text-gray-400 left-3 top-3" />
                </div>
                {session.data?.user.role === "EMPLOYEE" && (
                  <Link href={"/reports/create"}>
                    <Button className="items-center gap-1 px-3">
                      Create <Plus size={14} />{" "}
                    </Button>
                  </Link>
                )}
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
                    checked={selectedStatus.includes(ContactStatus.NEW)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedStatus([
                          ...selectedStatus,
                          ContactStatus.NEW,
                        ]);
                      } else {
                        setSelectedStatus(
                          selectedStatus.filter((s) => s !== "NEW")
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
                    checked={selectedStatus.includes(ContactStatus.REVIEWED)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedStatus([
                          ...selectedStatus,
                          ContactStatus.REVIEWED,
                        ]);
                      } else {
                        setSelectedStatus(
                          selectedStatus.filter((s) => s !== "REVIEWED")
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
                    onClick={()=>router.push(`/reports/${report.id}/review`)}
                  >
                    <Card className="transition-shadow hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                          <div>
                            <h3 className="font-medium">{report.fullName}</h3>
                            <p className="text-sm text-gray-600">
                              {report.primaryLocation}
                            </p>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">
                              {formatDate(report?.createdAt)}
                            </span>
                            <Badge
                              variant={
                                report.status === "NEW"
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

              {!loading &&
                filteredReports.length === 0 &&
                session.data?.user && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-8 text-center text-gray-500"
                  >
                    No reports found matching your criteria
                  </motion.div>
                )}

              {loading && <LoaderCircle size={32} className="spinner m-auto" />}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}