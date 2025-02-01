import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import AppRoutes from "./routes";
import { NotificationProvider } from "./context/NotificationContext";
import { SettingsProvider } from "./context/SettingsContext";
import { ThemeProvider } from "./components/common/ThemeProvider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <NotificationProvider>
          <ThemeProvider>
            <Router>
              <Toaster 
                position="top-center" 
                toastOptions={{ 
                  duration: 3000,
                  style: {
                    direction: 'rtl',
                    fontFamily: 'vazirmatn'
                  }
                }} 
              />
              <AppRoutes />
            </Router>
          </ThemeProvider>
        </NotificationProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}

export default App;