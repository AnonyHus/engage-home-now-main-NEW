import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { AuthProvider } from "./components/AuthContext.tsx"; 

createRoot(document.getElementById("root")!).render(
  <AuthProvider> {/* ✅ wrap everything here */}
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </AuthProvider>
);
