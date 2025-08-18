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
import PasswordSignUp from "./ui/PasswordSignup";
import { useUserStore } from "@/store/userStore";
import { useForm } from "react-hook-form";
import { userSchema, type UserFormData } from "@/schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import Loader from "./ui/Loader";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import {
  GoogleLogin,
  useGoogleLogin,
  type TokenResponse,
} from "@react-oauth/google";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { updateUserDetails } = useUserStore.getState();
  const userDetails = useUserStore((state) => state.userDetails);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setUser } = useAuthStore.getState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  function handleSignUp() {
    setLoading(true);

    axios
      .post(
        "https://neuronest-oevp.onrender.com/api/user/signup",
        {
          fullName: userDetails.fullName,
          username: userDetails.username,
          email: userDetails.email,
          password: userDetails.password,
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
        console.log(response);
        if (response.success) {
          setUser(response.user);
          setLoading(false);
          localStorage.setItem("authStatus", "isSignedUp");
          navigate("/main/dashboard");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      setLoading(true);
      try {
        // Use the access token to get user info from Google's API
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        // Now send this data to your backend
        await axios
          .post(
            "https://neuronest-oevp.onrender.com/api/user/googleup",
            {
              fullName: userInfo.data.name,
              email: userInfo.data.email,
              avatarUrl: userInfo.data.picture,
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
              setUser(response.user);
              setLoading(false);
              localStorage.setItem("authStatus", "isGoogleSignedUp");
              navigate("/main/dashboard");
            }
          });
      } catch (err) {
        setLoading(false);
        console.log(err);
        toast.error("Google login Failed");
      }
    },
    onError: () => {
      toast.error("Google Sign-In failed");
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div>
        <Toaster />
      </div>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome To NeuroNST</CardTitle>
          <CardDescription>Signup with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => {
                    googleLogin();
                  }}
                  variant="outline"
                  type="button"
                  className="w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Signup with Google
                </Button>
                {/* <GoogleLogin
                  text="signup_with"
                  onSuccess={async (response) => {
                    setLoading(false);
                    if (response.credential) {
                      const payload = JSON.parse(
                        atob(response.credential.split(".")[1])
                      );
                      await axios
                        .post(
                          "https://neuronest-oevp.onrender.com/api/user/googleup",
                          {
                            fullName: payload.name,
                            email: payload.email,
                            avatarUrl: payload.picture,
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
                            setUser(response.user);
                            setLoading(true);
                            localStorage.setItem(
                              "authStatus",
                              "isGoogleSignedUp"
                            );
                            navigate("/main/dashboard");
                          }
                        })
                        .catch((err) => {
                          setLoading(false);
                          toast.error(err.response.data.message);
                        });
                    }
                  }}
                /> */}
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    {...register("fullName")}
                    id="fullname"
                    onChange={(e) =>
                      updateUserDetails({ fullName: e.currentTarget.value })
                    }
                    type="name"
                    placeholder="John Doe"
                    required
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  {/* //TODO Check for Username exists or not in db realtime and debouncing */}
                  <Label htmlFor="username">UserName</Label>
                  <Input
                    {...register("username")}
                    id="username"
                    type="username"
                    onChange={(e) =>
                      updateUserDetails({ username: e.currentTarget.value })
                    }
                    placeholder="Lucifer915"
                    required
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    id="email"
                    onChange={(e) =>
                      updateUserDetails({ email: e.currentTarget.value })
                    }
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <PasswordSignUp registerProps={register("password")} />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  {loading ? <Loader /> : "Sign Up"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Sign In
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
