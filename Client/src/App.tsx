import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import LandingPage from "./Pages/LandingPage";
import { Login } from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import ChangePassword from "./Pages/ChangePassword";
import { ProtectedRoute } from "./lib/ProtectedRoute";
import Dashboard from "./Pages/Dashboard";
import { useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "./store/authStore";

function App() {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  useEffect(() => {
    axios
      .get("https://neuronest-oevp.onrender.com/api/user/me", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const response = res.data;
        if (response.success) {
          setUser(response.user);
        }
      })
      .catch((err) => {
        console.log(err);
        logout();
      });
  }, [setUser, logout]);
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotPass" element={<ForgotPassword />} />

          <Route path="/changePassword" element={<ChangePassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
