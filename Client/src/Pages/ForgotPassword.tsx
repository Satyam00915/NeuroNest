import { DarkLogo, LightLogo } from "@/components/hero-section";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/Loader";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate();

  const [otpLoader, setOtpLoader] = useState(false);

  const [email, setEmail] = useState("");
  const [value, setValue] = useState("");

  function sendOtp() {
    setLoading(true);
    axios
      .post(
        "https://neuronest-oevp.onrender.com/api/user/forgotpass",
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const response = res.data;
        toast.success(response.message);
        setDialogOpen(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function verifyOtp() {
    setOtpLoader(true);
    axios
      .post(
        "https://neuronest-oevp.onrender.com/api/user/verify",
        {
          email,
          otp: value,
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
          toast.success("Otp Verified");
          navigate(response.redirect);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      })
      .finally(() => {
        setOtpLoader(false);
      });
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Toaster />
      <div className="w-full max-w-sm">
        <div className={"flex flex-col gap-6"}>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <form>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Link
                    to="/"
                    className="flex flex-col items-center gap-2 font-medium"
                  >
                    <div className="flex items-center justify-center rounded-md">
                      {theme === "dark" ? (
                        <DarkLogo size="80pt" />
                      ) : (
                        <LightLogo size="80pt" />
                      )}
                    </div>
                    <span className="sr-only">NeuroNST</span>
                  </Link>

                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="underline underline-offset-4">
                      Sign up
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      onChange={(e) => {
                        setEmail(e.currentTarget.value);
                      }}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>

                  <Button
                    disabled={loading}
                    onClick={sendOtp}
                    type="button"
                    className={`w-full ${loading && "cursor-not-allowed"}`}
                  >
                    {loading ? <Loader /> : "Send OTP"}
                  </Button>

                  <DialogContent className="sm:max-w-[425px] space-y-8">
                    <DialogHeader className="flex justify-center items-center">
                      <DialogTitle>Enter OTP</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="flex justify-center items-center">
                      Check your email for OTP
                    </DialogDescription>
                    <div className="flex items-center justify-center">
                      <InputOTP
                        value={value}
                        onChange={(value) => setValue(value)}
                        maxLength={4}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" disabled={otpLoader}>
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        className="cursor-pointer"
                        onClick={verifyOtp}
                        type="button"
                      >
                        {otpLoader ? <Loader /> : "Verify"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </div>

                <div className="grid gap-4 sm:grid-cols-2"></div>
              </div>
            </form>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
