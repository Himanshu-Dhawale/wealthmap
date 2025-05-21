"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Activity, Calendar, Clock, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Member } from "@/types/types";

interface ViewActivityDialogProps {
  member: Member;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewActivityDialog({
  member,
  open,
  onOpenChange,
}: ViewActivityDialogProps) {

  const activityData = {
    logins: 42,
    lastLogin: new Date().toISOString(),
    featuresUsed: ["Dashboard", "Transactions", "Reports"],
    averageSession: "12 minutes",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              {member.name}'s Activity
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-2 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>Total Logins</span>
              </div>
              <div className="text-2xl font-bold mt-2">{activityData.logins}</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>Average Session</span>
              </div>
              <div className="text-2xl font-bold mt-2">{activityData.averageSession}</div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Last Login</h3>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(activityData.lastLogin).toLocaleString()}</span>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Features Used</h3>
            <div className="flex flex-wrap gap-2">
              {activityData.featuresUsed.map((feature) => (
                <Badge key={feature} variant="outline">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}