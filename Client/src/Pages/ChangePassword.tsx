import { ChangePassForm } from "@/components/changePass";
import { Toaster } from "react-hot-toast";

const ChangePassword = () => {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Toaster />
      <div className="w-full max-w-sm">
        <ChangePassForm />
      </div>
    </div>
  );
};

export default ChangePassword;
