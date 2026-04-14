import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./hooks/useTheme";
import LoadingScreen from "./components/LoadingScreen";
import Portfolio from "./Portfolio";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FIX: 2s is enough — 2.5s felt sluggish
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <div key="app" style={{ minHeight: "100vh" }}>
            <Portfolio />
          </div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}
