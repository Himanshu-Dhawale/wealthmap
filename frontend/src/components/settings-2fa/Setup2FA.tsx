import React, { Dispatch, SetStateAction } from "react";
import { CopyButton } from "../CopyButton";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuthStore } from "@/stores/authStore";

const Setup2FA = ({
  setIsVerificationDialogOpen,
}: {
  setIsVerificationDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useAuthStore();
  return (
    <div className="rounded-lg border bg-white p-6 space-y-6">
      <h4 className="font-medium">Set Up Two-Factor Authentication</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Copy this secret key:</p>
          <div className="flex items-center gap-2 mt-2">
            <Input
              value={user?.twoFASecret}
              readOnly
              className="font-mono border-[1.5px]"
            />
            <CopyButton value={user?.twoFASecret ?? ""} />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Instructions</p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>
                Install an authenticator app like Google Authenticator or Authy
              </li>
              <li>Enter the secret key manually</li>
              <li>Enter the 6-digit code from your app to verify</li>
            </ol>
          </div>

          <div className="pt-4">
            <Button
              onClick={() => setIsVerificationDialogOpen(true)}
              className="w-full bg-blue-gradient-start hover:bg-blue-gradient-start/90"
            >
              I've set up my authenticator app
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup2FA;