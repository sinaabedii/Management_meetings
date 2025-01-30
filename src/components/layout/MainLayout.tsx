import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useTheme } from "../common/ThemeProvider";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  Bars3Icon,
  SunIcon,
  MoonIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import ProfileMenu from "../common/ProfileMenu";
import NotificationsDropdown from "../common/NotificationsDropdown";
import SearchDropdown from "../common/SearchDropdown";
import SettingsModal from "../settings/SettingsModal";

const navigation = [
  { name: "داشبورد", href: "/", icon: HomeIcon },
  { name: "تقویم", href: "/calendar", icon: CalendarIcon },
  { name: "جلسات", href: "/meetings", icon: CalendarIcon },
  { name: "کاربران", href: "/users", icon: UsersIcon },
  { name: "گزارش‌ها", href: "/reports", icon: ChartBarIcon },
  { name: "فایل‌ها", href: "/files", icon: FolderIcon },
];

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden transition-opacity duration-300",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      />
      <div
        className={clsx(
          "fixed inset-y-0 right-0 z-50 w-64 bg-white/80 rounded-l-2xl backdrop-blur-xl dark:bg-gray-800/90 shadow-lg md:hidden",
          "transform transition-transform duration-300 ease-out",
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center px-4 h-16 border-b border-gray-100 dark:border-gray-700">
            <img className="h-8" src="/logo.svg" alt="Logo" />
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors duration-200"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => {
                  setSidebarOpen(false);
                }}
                className="group flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 transform hover:scale-102 active:scale-98"
              >
                <item.icon className="ml-3 h-5 w-5 text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-200" />
                {item.name}
              </Link>
            ))}
          </nav>
        <h1>aaa</h1>
        </div>
      </div>
      <div className="hidden md:fixed md:inset-y-0 md:right-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-1 bg-white/80 backdrop-blur-xl dark:bg-gray-800/90 shadow-lg">
          <div className="flex justify-center h-16 items-center px-4 border-b border-gray-100 dark:border-gray-700">
            <img className="h-8" src="/logo.svg" alt="Logo" />
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200"
              >
                <item.icon className="ml-3 h-5 w-5 text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="md:pr-64">
        <header className="fixed top-0 right-0 left-0 md:right-64 z-30">
          <div className="bg-white/80 backdrop-blur-xl dark:bg-gray-800/90 shadow-sm">
            <div className="flex h-16 items-center justify-between px-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                <Bars3Icon className="h-5 w-5" />
              </button>

              <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-start">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <SearchDropdown />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <NotificationsDropdown />

                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
                >
                  {theme === "light" ? (
                    <MoonIcon className="h-5 w-5" />
                  ) : (
                    <SunIcon className="h-5 w-5" />
                  )}
                </button>

                <button
                  onClick={() => setShowSettings(true)}
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
                >
                  <Cog6ToothIcon className="h-5 w-5" />
                </button>

                <ProfileMenu />
              </div>
            </div>
            <SettingsModal
              isOpen={showSettings}
              onClose={() => setShowSettings(false)}
            />
          </div>
        </header>
        <main className="pt-16">
          <div className="px-4 py-6 max-w-7xl mx-auto">
            <div className="bg-white/60 backdrop-blur-xl dark:bg-gray-800/60 rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
