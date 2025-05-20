import { postReq } from "@/lib/axios-helpers/apiClient";
import { MembersState } from "@/types/types";
import { create } from "zustand";
import { toast } from "sonner";
import { getSession } from "next-auth/react";

export const useMembersStore = create<MembersState>()((set) => ({
  members: [
    {
      id: "1",
      name: "John Doe",
      email: "john@wealthmap.com",
      role: "admin",
      status: "active",
      joinedAt: new Date("2023-01-15"),
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@wealthmap.com",
      role: "member",
      status: "active",
      joinedAt: new Date("2023-02-20"),
    },
  ],
  addMember: (member) =>
    set((state) => ({
      members: [
        ...state.members,
        {
          ...member,
          id: Math.random().toString(36).substring(2, 9),
          status: "active",
          joinedAt: new Date(),
        },
      ],
    })),
  updateMember: (id, updates) =>
    set((state) => ({
      members: state.members.map((member) =>
        member.id === id ? { ...member, ...updates } : member
      ),
    })),
  removeMember: (id) =>
    set((state) => ({
      members: state.members.filter((member) => member.id !== id),
    })),

  inviteMember: async (email, role) => {
    const session = await getSession()
    const token = session?.user.accessToken
    try {
      const res = await postReq("/company-onboarding/invite", { email }, token);
      if (res.status === 201) {
        set((state) => ({
          members: [
            ...state.members,
            {
              id: Math.random().toString(36).substring(2, 9),
              name: "",
              email,
              role,
              status: "pending",
              joinedAt: new Date(),
            },
          ],
        }));
        toast.success("Invitation sent", {
          description: `An invitation has been sent to ${email}`,
        });
      }
    } catch (error) {
      console.error("API error inviting member:", error);
      throw error;
    }
  },
}));