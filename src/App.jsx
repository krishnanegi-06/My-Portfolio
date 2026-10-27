import { ThemeProvider } from "./hooks/useTheme";
import Portfolio from "./Portfolio";

export default function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}
