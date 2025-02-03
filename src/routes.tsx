import { Routes, Route, Navigate, Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { PERMISSIONS } from "./types/auth";
import Login from "./pages/Login";
import { MainLayout } from "./components/layout/MainLayout";
import MeetingDetailsPage from "./pages/MeetingDetailsPage";
import UserDetails from "./pages/UserDetails";
import FileDetails from "./pages/FileDetails";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Meetings = lazy(() => import("./pages/Meetings"));
const Users = lazy(() => import("./pages/Users"));
const Reports = lazy(() => import("./pages/Reports"));
const Files = lazy(() => import("./pages/Files"));
const Profile = lazy(() => import("./pages/Profile"));
const Calendar = lazy(() => import("./pages/Calendar"));
const NotFound = lazy(() => import("./pages/NotFound"));
// const ChatRoom = lazy(() => import("./pages/ChatRoom"));

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      }
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute
                requiredPermissions={[PERMISSIONS.MANAGE_MEETINGS]}
              >
                <Calendar />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/chatroom"
            element={
              <ProtectedRoute
                requiredPermissions={[PERMISSIONS.MANAGE_MEETINGS]}
              >
                <ChatRoom />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/meetings"
            element={
              <ProtectedRoute
                requiredPermissions={[PERMISSIONS.MANAGE_MEETINGS]}
              >
                <Meetings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meetings/:id"
            element={
              <ProtectedRoute
                requiredPermissions={[PERMISSIONS.MANAGE_MEETINGS]}
              >
                <MeetingDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute requiredPermissions={[PERMISSIONS.MANAGE_USERS]}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute requiredPermissions={[PERMISSIONS.MANAGE_USERS]}>
                <UserDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute requiredPermissions={[PERMISSIONS.VIEW_REPORTS]}>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/files"
            element={
              <ProtectedRoute requiredPermissions={[PERMISSIONS.MANAGE_FILES]}>
                <Files />
              </ProtectedRoute>
            }
          />
          <Route
            path="/files/:id"
            element={
              <ProtectedRoute requiredPermissions={[PERMISSIONS.MANAGE_FILES]}>
                <FileDetails />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/unauthorized"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  دسترسی غیرمجاز
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  شما مجوز دسترسی به این صفحه را ندارید
                </p>
                <Link
                  to="/"
                  className="text-primary-600 hover:text-primary-500"
                >
                  بازگشت به صفحه اصلی
                </Link>
              </div>
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
