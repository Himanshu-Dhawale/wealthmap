import { getReq, patchReq, postReq } from "@/lib/axios-helpers/apiClient";
import { Member, MembersState, Status } from "@/types/types";
import { create } from "zustand";
import { toast } from "sonner";
import { getSession } from "next-auth/react";
import { EMPLOYEES, EMPLOYEE_DEACTIVATE, EMPLOYEE_INVITE } from "@/endpoints/employee.endpoint";

export const useMembersStore = create<MembersState>()((set) => ({
  members: [],

  fetchMembers: async () => {
    try {
      const session = await getSession();
      const token = session?.user.accessToken;
      const res = await getReq<{ members: Member[] }>(EMPLOYEES, {}, token);

      const sorted = (res?.data?.members || []).sort((a, b) =>
        a.email.localeCompare(b.email)
      );


      set((state) => ({ ...state, members: sorted }));
    } catch (error) {
      console.log(error);
    }
  },

  addMember: (member) =>
    set((state) => {
      const updated = [
        ...state.members,
        {
          ...member,
          id: Math.random().toString(36).substring(2, 9),
          status: Status.ACTIVE,
          joinedAt: new Date(),
        },
      ].sort((a, b) => a.email.localeCompare(b.email));

      return { ...state, members: updated };
    }),

  updateMember: (id, updates) =>
    set((state) => {
      const updated = state.members
        .map((member) =>
          member.id === id ? { ...member, ...updates } : member
        )
        .sort((a, b) => a.email.localeCompare(b.email));

      return { ...state, members: updated };
    }),

  removeMember: async (id) => {
    const session = await getSession();
    const token = session?.user.accessToken;
    const deactivateAccountEndpoint = `${EMPLOYEE_DEACTIVATE}/${id}/deactivate`;
    try {
      const response = await patchReq<{ message: string, members: Member[] }>(
        deactivateAccountEndpoint,
        {},
        token
      );

      if (response.status === 200) {
        toast.success(response.data.message);

        const sorted = [...response.data.members].sort((a, b) =>
          a.email.localeCompare(b.email)
        );

        set((state) => ({ ...state, members: sorted }));
      }
    } catch (error) {
      console.error("API error deactivating member:", error);
      throw error;
    }
  },

  inviteMember: async (email, role) => {
    const session = await getSession();
    const token = session?.user.accessToken;
    try {
      const res = await postReq<{ invitationId: string, message: string }>(EMPLOYEE_INVITE, { email }, token);

      if (res.status === 200 || res.status === 201) {
        const newMember = {
          id: Math.random().toString(36).substring(2, 9),
          name: "",
          email,
          role,
          status: Status.PENDING,
          joinedAt: new Date(),
        };

        set((state) => ({
          members: [...state.members, newMember].sort((a, b) =>
            a.email.localeCompare(b.email)
          ),
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

  acceptInvitaion: (email, name) =>
    set((state) => {
      const updated = state.members
        .map((member) =>
          member.email === email ? { ...member, name, status: Status.ACTIVE } : member
        )
        .sort((a, b) => a.email.localeCompare(b.email));

      return { ...state, members: updated };
    }),
}));
