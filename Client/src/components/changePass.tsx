import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./ui/Loader";

export function ChangePassForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!(newPass === confirmPass)) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    axios
      .post(
        "https://neuronest-oevp.onrender.com/api/user/changePass",
        {
          password: newPass,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const response = res.data;
        if (response.success) {
          toast.success(response.message);
          navigate(response.redirect);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message + " Please try again");
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Enter your new password below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={changePassword}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  onChange={(e) => {
                    setNewPass(e.currentTarget.value);
                  }}
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  onChange={(e) => {
                    setConfirmPass(e.currentTarget.value);
                  }}
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className={`w-full ${loading && "cursor-not-allowed"}`}
                >
                  {loading ? <Loader /> : "Update Password"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
