import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import LandingPage from "./Pages/LandingPage";
import { Login } from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import ChangePassword from "./Pages/ChangePassword";
import { ProtectedRoute } from "./lib/ProtectedRoute";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import api from "./lib/api";
import Layout from "./Pages/Layout";
import { Dashboard } from "./Pages/Dashboard";
import { Notes } from "./Pages/Notes";
import Reminders from "./Pages/Reminders";

function App() {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  useEffect(() => {
    const authPages = ["/login", "/signup", "/forgotPass", "/changePassword"];
    if (authPages.some((path) => window.location.pathname.startsWith(path))) {
      return;
    }

    api
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
            <Route path="/main" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="notes" element={<Notes />} />
              <Route path="reminders" element={<Reminders />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
