import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Check,
  Clock,
  X,
  MoreVertical,
  Shield,
  User,
  Mail,
  Activity,
  Key,
  Database,
  Trash2,
  Pen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ViewActivityDialog } from "./ViewActivity";
import { Member } from "@/types/types";

export function MembersTable({ members }: { members: Member[] }) {
  const [viewingActivityFor, setViewingActivityFor] = useState<Member | null>(
    null
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Check className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "inactive":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Last Active</TableHead>
            {/* <TableHead>Permissions</TableHead>
              <TableHead>Data Access</TableHead> */}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{member.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{member.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  className="text-start "
                  variant={member.role === "admin" ? "default" : "outline"}
                >
                  <Shield className="h-3 w-3 mr-1" />
                  {member.role.toLowerCase()}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {getStatusIcon(member.status)}
                  <span className=" capitalize">
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Pen size={14} className="h-4 w-4 mr-2" />
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Key className="h-4 w-4 mr-2" />
                      Manage Permissions
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setViewingActivityFor(member)}
                    >
                      <Activity className="h-4 w-4 mr-2" />
                      View Activity
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Database className="h-4 w-4 mr-2" />
                      Set Data Access
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Revoke Access
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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