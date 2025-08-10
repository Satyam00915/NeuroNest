import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import LandingPage from "./Pages/LandingPage";
import { Login } from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import ChangePassword from "./Pages/ChangePassword";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotPass" element={<ForgotPassword />} />

          <Route path="/changePassword" element={<ChangePassword />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
