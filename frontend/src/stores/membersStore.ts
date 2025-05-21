import { getReq, postReq } from "@/lib/axios-helpers/apiClient";
import { MembersState } from "@/types/types";
import { create } from "zustand";
import { toast } from "sonner";
import { getSession } from "next-auth/react";
import { EMPLOYEES, EMPLOYEE_INVITE } from "@/endpoints/employee.endpoint";

export const useMembersStore = create<MembersState>()((set) => ({
  members: [],
  fetchMembers: async () => {
    try {
      const session = await getSession();
      const token = session?.user.accessToken;
      const res: any = await getReq(EMPLOYEES, {}, token);
      set((state) => ({ ...state, members: res?.data.members }));
    } catch (error) {
      console.log(error);
    }
  },
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
    const session = await getSession();
    const token = session?.user.accessToken;
    try {
      const res = await postReq(EMPLOYEE_INVITE, { email }, token);
      if (res.status === 200 || res.status === 201) {
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
  acceptInvitaion: (email, name) => {
    set((state) => ({
      members: state.members.map((member) =>
        member.email === email ? { ...member, name, status: "active" } : member
      ),
    }));
  },
}));