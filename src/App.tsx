import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './components/common/ThemeProvider';
import { MainLayout } from './components/layout/MainLayout';
import AppRoutes from './routes';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;