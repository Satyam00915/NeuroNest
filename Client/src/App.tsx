import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import LandingPage from "./Pages/LandingPage";
import { Login } from "./Pages/Login";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
