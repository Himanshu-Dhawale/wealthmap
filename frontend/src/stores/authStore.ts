import { create } from "zustand";
import { toast } from "sonner";
import { getSession } from "next-auth/react";
import { postReq, getReq } from "@/lib/axios-helpers/apiClient";
import { AuthState, TwoFAStatus } from "@/types/types";
import { MFA, VERIFY_MFA } from "@/endpoints/auth.endpoint";

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: "",
    name: "",
    email: "",
    twoFAStatus: TwoFAStatus.DISABLED,
    twoFASecret: "",
  },

  enable2FA: async (id, email) => {
    try {
      const session = await getSession();
      const token = session?.user.accessToken;
      const response = await getReq<{
        message: string;
        secret: string;
        issuer: string;
        account: string;
      }>(MFA, {}, token);

      if (response.status === 200 && response.data.secret) {
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                id: id,
                email: email,
                twoFAStatus: TwoFAStatus.PENDING_VERIFICATION,
                twoFASecret: response?.data.secret,
              }
            : null,
        }));
      }
      return { secret: response?.data?.secret };
    } catch (error) {
      toast.error("Failed to enable 2FA");
      console.error(error);
    }
  },

  verify2FA: async (code: string) => {
    try {
      const session = await getSession();
      const token = session?.user.accessToken;
      const res = await postReq<{ message: string }>(
        VERIFY_MFA,
        { token: code },
        token
      );
      if (res.status === 200) {
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                twoFAStatus: TwoFAStatus.ENABLED,
              }
            : null,
        }));
        toast.success("2FA has been successfully enabled");
      }
    } catch (error) {
      toast.error("Invalid verification code");
      console.error(error);
    }
  },

  disable2FA: async () => {
    try {
      const session = await getSession();
      const token = session?.user.accessToken;
      // await deleteReq('/api/2fa', {}, token);

      set((state) => ({
        user: state.user
          ? {
              ...state.user,
              twoFAStatus: TwoFAStatus.DISABLED,
              twoFASecret: undefined,
            }
          : null,
      }));

      toast.success("2FA has been disabled");
    } catch (error) {
      toast.error("Failed to disable 2FA");
      console.error(error);
    }
  },
}));