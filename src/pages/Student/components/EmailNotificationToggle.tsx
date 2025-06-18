"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateEmailApi } from "@/apis/student";
import { ClipLoader } from "react-spinners";

export function EmailNotificationToggle({
  email,
  id,
}: {
  email?: string;
  id: string;
}) {
  const [isOn, setIsOn] = useState(Boolean(email));
  const [showDialog, setShowDialog] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleToggle = async (checked: boolean) => {
    if (!email && checked) {
      setShowDialog(true);
      return;
    }
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await updateEmailApi(id, email!, false);

      if (!res.success) {
        toast.error("Failed to update email service.");
        console.error("Failed to update email service:", res.message);
        return;
      }
      toast.success("Email service updated.");

      setIsOn(checked);
    } catch (error) {
      toast.error("Failed to update email service.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEmail = async () => {
    if (!emailInput) return;

    const res = await updateEmailApi(id, emailInput, true);

    if (!res.success) {
      toast.error("Failed to update email.");
      console.error("Failed to update email:", res.message);
      return;
    }
    toast.success("Email updated.");

    setShowDialog(false);
    setIsOn(true);
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <Switch
          id="airplane-mode"
          checked={isOn}
          disabled={loading}
          onCheckedChange={handleToggle}
        />
        <Label htmlFor="airplane-mode text-xs">Allow Email Reminders</Label>
        {loading && (
          <ClipLoader loading={loading} size={16} color="text-primary" />
        )}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>No email found</DialogTitle>
            <DialogDescription>
              Please enter your email to receive notifications.
            </DialogDescription>
          </DialogHeader>
          <Input
            type="email"
            placeholder="Enter your email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <DialogFooter className="mt-4">
            <Button onClick={handleSaveEmail}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
