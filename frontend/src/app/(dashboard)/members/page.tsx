"use client";
import { useMembersStore } from "@/stores/membersStore";
import { MemberCard } from "@/components/members/MemberCard";
import { InviteMemberDialog } from "@/components/members/InviteMemberDialog";
import { EditMemberDialog } from "@/components/members/EditMember";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  const activeMembers = filteredMembers.filter((m) => m.status === "active");
  const pendingMembers = filteredMembers.filter((m) => m.status === "pending");
  const inactiveMembers = filteredMembers.filter(
    (m) => m.status === "inactive"
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

        <Tabs defaultValue="all" className="w-full ">
          <TabsList>
            <TabsTrigger value="all">All Members</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="pt-6">
            {filteredMembers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">No members found</p>
              </div>
            ) : (
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
            )}
          </TabsContent>

          <TabsContent value="active" className="pt-6">
            {activeMembers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">No active members</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {activeMembers.map((member) => (
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
            )}
          </TabsContent>

          <TabsContent value="pending" className="pt-6">
            {pendingMembers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">No pending members</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pendingMembers.map((member) => (
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
            )}
          </TabsContent>

          <TabsContent value="inactive" className="pt-6">
            {inactiveMembers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">No inactive members</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {inactiveMembers.map((member) => (
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
            )}
          </TabsContent>
        </Tabs>
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