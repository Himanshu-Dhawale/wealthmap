"use client";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function CopyButton({ value }: { value: string }) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setHasCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={copyToClipboard}
      disabled={hasCopied}
    >
      {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
}