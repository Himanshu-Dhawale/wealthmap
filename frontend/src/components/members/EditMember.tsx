"use client";
import { useState } from "react";
import { useMembersStore } from "@/stores/membersStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Mail, Shield, Check, Clock, X } from "lucide-react";
import { toast } from "sonner";
import { Member, Status } from "@/types/types";

interface EditMemberDialogProps {
  member: Member;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditMemberDialog({
  member,
  open,
  onOpenChange,
}: EditMemberDialogProps) {
  const [name, setName] = useState(member.name);
  const [role, setRole] = useState<"admin" | "member">(member.role);
  const [status, setStatus] = useState<Status>(
    member.status
  );
  const [isLoading, setIsLoading] = useState(false);
  const updateMember = useMembersStore((state) => state.updateMember);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      updateMember(member.id, { name, role, status });
      toast.success("Member updated", {
        description: "Member details have been updated successfully",
      });
      onOpenChange(false);
    } catch (error) {
      toast.error("Error", {
        description: `Failed to update member`,
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Edit Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Name</label>
            <div className="relative">
              <User className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                placeholder="Member name"
                className="pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Email</label>
            <div className="relative">
              <Mail className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                type="email"
                value={member.email}
                className="pl-10"
                disabled
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Role</label>
            <div className="relative">
              <Shield className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Select
                value={role}
                onValueChange={(value: "admin" | "member") => setRole(value)}
              >
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Status</label>
            <Select
              value={status}
              onValueChange={(value: Status) =>
                setStatus(value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="active">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    Active
                  </div>
                </SelectItem>
                <SelectItem value="pending">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-yellow-500" />
                    Pending
                  </div>
                </SelectItem>
                <SelectItem value="inactive">
                  <div className="flex items-center">
                    <X className="w-4 h-4 mr-2 text-red-500" />
                    Inactive
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}