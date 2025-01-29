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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div
        className={clsx(
          "fixed inset-0 z-40 flex md:hidden",
          sidebarOpen ? "visible" : "invisible"
        )}
        role="dialog"
        aria-modal="true"
      >
        <div
          className={clsx(
            "fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity",
            sidebarOpen
              ? "opacity-100 ease-out duration-300"
              : "opacity-0 ease-in duration-200"
          )}
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        />

        <div
          className={clsx(
            "relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-800 pt-5 pb-4 transition ease-in-out duration-300 transform",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="absolute top-0 left-0 -ml-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-shrink-0 flex items-center px-4">
            <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
          </div>
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <item.icon
                    className="ml-4 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pt-5">
          <div className="flex flex-shrink-0 items-center px-4">
            <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <item.icon
                    className="ml-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="md:pr-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
          <button
            type="button"
            className="px-4 border-l border-gray-200 dark:border-gray-700 text-gray-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <SearchDropdown />
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-4 space-x-reverse">
              <NotificationsDropdown />
              <button
                type="button"
                className="bg-white dark:bg-gray-800 p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <MoonIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <SunIcon className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                className="bg-white dark:bg-gray-800 p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                onClick={() => setShowSettings(true)}
              >
                <Cog6ToothIcon className="h-6 w-6" />
              </button>
              <ProfileMenu />
            </div>
          </div>
          <SettingsModal
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
          />
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
