import { HeroSection } from "./components/hero-section";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <HeroSection />
      </ThemeProvider>
    </>
  );
}

export default App;
