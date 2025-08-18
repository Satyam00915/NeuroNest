import AdvLoader from "@/components/ui/AdvLoader";
import { useAuthStore } from "@/store/authStore";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isLoggedIn } = useAuthStore();
  if (isLoggedIn == null)
    return (
      <div className="flex justify-center items-center">
        <AdvLoader />
      </div>
    );
  if (!isLoggedIn) return <Navigate to="/login" />;
  return <Outlet />;
};
