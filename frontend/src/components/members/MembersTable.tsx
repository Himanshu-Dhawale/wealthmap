import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, Clock, X, Shield, User, Mail, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ViewActivityDialog } from "./ViewActivity";
import { Member } from "@/types/types";

export function MembersTable({
  members,
  removeMember,
}: {
  members: Member[];
  removeMember: (id: string) => void;
}) {
  const [viewingActivityFor, setViewingActivityFor] = useState<Member | null>(
    null
  );

  

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Check className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "inactive":
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={`${member.id ?? "inv"}-${member.email}`}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{member.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{member.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  className="text-start "
                  variant={member.role === "admin" ? "default" : "outline"}
                >
                  <Shield className="w-3 h-3 mr-1" />
                  {member.role.toLowerCase()}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {getStatusIcon(member.status)}
                  <span className="capitalize ">
                    {member.status.toLowerCase()}
                  </span>
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(member.joinedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {member.lastActive
                  ? new Date(member.lastActive).toLocaleString()
                  : "Never"}
              </TableCell>
              <TableCell>
                {member.status.toLowerCase() !== "revoked" && 
   member.role.toLowerCase() !== "admin" && (<Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeMember(member.id)}
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Revoke
                </Button>)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {viewingActivityFor && (
        <ViewActivityDialog
          member={viewingActivityFor}
          open={!!viewingActivityFor}
          onOpenChange={(open) => !open && setViewingActivityFor(null)}
        />
      )}
    </div>
  );
}
