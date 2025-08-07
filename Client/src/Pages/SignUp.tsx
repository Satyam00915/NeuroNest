import { DarkLogo, LightLogo } from "@/components/hero-section";
import { SignupForm } from "@/components/signup-form";
import { useTheme } from "@/components/theme-provider";

const SignUp = () => {
  const { theme } = useTheme();
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-1 self-center font-medium">
          <div className=" text-primary-foreground flex items-center justify-center rounded-md">
            {theme === "light" ? (
              <LightLogo size="40pt" />
            ) : (
              <DarkLogo size="40pt" />
            )}
          </div>
          NeuroNST.
        </a>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignUp;
