"use client";
import { useMembersStore } from "@/stores/membersStore";
import { MembersTable } from "@/components/members/MembersTable";
import { InviteMemberDialog } from "@/components/members/InviteMemberDialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function ManageMembersPage() {
  const { members, fetchMembers } = useMembersStore();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user.accessToken) {
      fetchMembers();
    }
  }, [fetchMembers, session?.user.accessToken]);

  const filteredMembers = members.filter(
    (member) =>
      `${member.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Team Management
            </h1>
            <p className="text-muted-foreground">
              Manage your team members, permissions, and data access
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Company Preferences</Button>
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
        <MembersTable members={filteredMembers} />
      </div>
    </div>
  );
}