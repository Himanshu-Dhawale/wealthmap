import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Mail,
  Shield,
  Calendar,
  Check,
  Clock,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Member } from "@/types/types";

type MemberCardProps = {
  member: Member;
  onEdit: (member: Member) => void;
  onRemove: (id: string) => void;
};

export function MemberCard({ member, onEdit, onRemove }: MemberCardProps) {
  const getStatusIcon = () => {
    switch (member.status) {
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
    <div className="p-4 transition-shadow border rounded-lg shadow-sm bg-card hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="font-medium">{member.name || "Invited User"}</h3>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <Mail className="w-4 h-4 mr-1" />
              <span>{member.email}</span>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem onClick={() => onEdit(member)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onRemove(member.id)}
            >
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <Badge variant={member.role === "admin" ? "default" : "secondary"}>
          <Shield className="w-3 h-3 mr-1" />
          {member.role}
        </Badge>
        <Badge variant="outline">
          {getStatusIcon()}
          <span className="ml-1 capitalize">{member.status}</span>
        </Badge>
        <Badge variant="outline">
          <Calendar className="w-3 h-3 mr-1" />
          {new Date(member.joinedAt).toLocaleDateString()}
        </Badge>
      </div>
    </div>
  );
}