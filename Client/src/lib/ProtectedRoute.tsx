 
 
import Loader from "@/components/ui/Loader";
import { useAuthStore } from "@/store/authStore";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isLoggedIn } = useAuthStore();
  if (isLoggedIn == null) return <Loader />;
  if (!isLoggedIn) return <Navigate to="/login" />;
  return <Outlet />;
};
 
 
 
   
   