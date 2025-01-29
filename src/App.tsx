import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import AppRoutes from "./routes";
import { NotificationProvider } from "./context/NotificationContext";
import { SettingsProvider } from "./context/SettingsContext";
import { ThemeProvider } from "./components/common/ThemeProvider";

function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <NotificationProvider>
          <ThemeProvider>
            <Router>
              <AppRoutes />
            </Router>
          </ThemeProvider>
        </NotificationProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}

export default App;