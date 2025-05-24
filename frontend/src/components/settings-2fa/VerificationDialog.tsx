
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Input } from "../ui/input";

const VerificationDialog = ({
  isOpen,
  onOpenChange,
  verificationCode,
  setVerificationCode,
  onVerify,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  onVerify: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify Authenticator Code</DialogTitle>
          <DialogDescription>
            Enter the 6-digit code from your authenticator app
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Input
            placeholder="123456"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="text-center text-lg font-mono tracking-widest focus-visible:ring-blue-gradient-start"
            maxLength={6}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onVerify}
            className="bg-blue-gradient-start hover:bg-blue-gradient-start/90"
          >
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default VerificationDialog;