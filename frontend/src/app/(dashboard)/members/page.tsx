"use client";
import { useMembersStore } from "@/stores/membersStore";
import { MemberCard } from "@/components/members/MemberCard";
import { InviteMemberDialog } from "@/components/members/InviteMemberDialog";
import { EditMemberDialog } from "@/components/members/EditMember";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Member } from "@/types/types";

export default function ManageMembersPage() {
  const members = useMembersStore((state) => state.members);
  const removeMember = useMembersStore((state) => state.removeMember);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
            <p className="text-muted-foreground">
              Manage your WealthMap team members and their permissions
            </p>
          </div>
          <div className="flex space-x-2">
            <InviteMemberDialog />
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onEdit={(member) => {
                setEditingMember(member);
                setIsEditDialogOpen(true);
              }}
              onRemove={removeMember}
            />
          ))}
        </div>
      </div>

      {editingMember && (
        <EditMemberDialog
          member={editingMember}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        />
      )}
    </div>
  );
}