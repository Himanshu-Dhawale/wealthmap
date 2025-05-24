"use client";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { useSession } from "next-auth/react";
import VerificationDialog from "@/components/settings-2fa/VerificationDialog";
import Setup2FA from "@/components/settings-2fa/Setup2FA";

export default function SecuritySettingsPage() {
  const { data: session } = useSession();
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] =
    useState(false);

  const { enable2FA, fetch2FAStatus, disable2FA, verify2FA, user } =
    useAuthStore();
  const email = session?.user.email ?? "";
  const id = session?.user.id ?? "";

  useEffect(() => {
    fetch2FAStatus();
  }, [fetch2FAStatus]);

  const handleEnable2FA = async () => {
    try {
      await enable2FA(id, email);
      toast.success("2FA setup initiated");
    } catch (error) {
      toast.error("Failed to initiate 2FA setup");
      console.log(error);
    }
  };

  const handleDisable2FA = async () => {
    try {
      disable2FA();
      toast.success("2FA has been disabled");
    } catch (error) {
      toast.error("Failed to disable 2FA");
      console.error(error);
    }
  };

  const handle2FAToggle = async (checked: boolean) => {
    if (checked) {
      await handleEnable2FA();
    } else {
      await handleDisable2FA();
    }
  };

  const handleVerify2FA = async () => {
    try {
      await verify2FA(verificationCode);
      setIsVerificationDialogOpen(false);
      setVerificationCode("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
        <p className="text-sm text-muted-foreground">
          Add an extra layer of security to your account
        </p>
      </div>

      <div className="flex items-center justify-between bg-white rounded-lg border p-4">
        <div className="space-y-0.5">
          <label htmlFor="2fa-toggle" className="text-base">
            2FA Status
          </label>
          <p className="text-sm text-muted-foreground">
            {user?.twoFAStatus === "ENABLED"
              ? "Enabled"
              : user?.twoFAStatus === "PENDING_VERIFICATION"
              ? "Pending Verification"
              : "Disabled"}
          </p>
        </div>
        <Switch
          id="2fa-toggle"
          checked={
            user?.twoFAStatus === "ENABLED" ||
            user?.twoFAStatus === "PENDING_VERIFICATION"
          }
          onCheckedChange={handle2FAToggle}
          disabled={user?.twoFAStatus === "PENDING_VERIFICATION"}
        />
      </div>
      {user?.twoFAStatus === "PENDING_VERIFICATION" && (
        <Setup2FA setIsVerificationDialogOpen={setIsVerificationDialogOpen} />
      )}
      <VerificationDialog
        isOpen={isVerificationDialogOpen}
        onOpenChange={setIsVerificationDialogOpen}
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
        onVerify={handleVerify2FA}
      />
    </div>
  );
}