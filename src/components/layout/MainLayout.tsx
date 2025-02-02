import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  Bars3Icon,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden transition-all duration-500",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      />
      <div
        className={clsx(
          "fixed inset-y-0 right-0 z-50 w-64 bg-white/90 rounded-l-2xl backdrop-blur-xl dark:bg-gray-800/95 shadow-2xl md:hidden",
          "transform transition-all duration-500 ease-out",
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center px-4 h-16 border-b border-gray-100/50 dark:border-gray-700/50">
            <img
              className="h-8 transform transition-transform hover:scale-105"
              src="./public/assets/logo.png"
              alt="Logo"
            />
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-700/80 text-gray-500 dark:text-gray-400 transition-all duration-300 hover:rotate-90"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className="group flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 
                hover:bg-gradient-to-r hover:from-purple-50/80 hover:via-pink-50/60 hover:to-purple-50/80 
                dark:hover:from-gray-700/80 dark:hover:via-purple-900/30 dark:hover:to-gray-700/80 
                transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]
                active:scale-95 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r 
                before:from-purple-500/0 before:via-purple-500/[0.05] before:to-purple-500/0 
                before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/0 to-pink-400/0 
                group-hover:from-purple-400/10 group-hover:via-purple-400/10 group-hover:to-pink-400/10 transition-all duration-500"
                />
                <item.icon
                  className="ml-3 h-5 w-5 text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 
                transition-all duration-300 transform group-hover:-rotate-12"
                />
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="hidden md:fixed md:inset-y-0 md:right-0 md:flex md:w-64 md:flex-col">
        <div
          className="flex flex-col flex-1 bg-gradient-to-b from-white/95 via-white/90 to-white/95 backdrop-blur-xl
           dark:from-gray-800/95 dark:via-gray-800/90 dark:to-gray-800/95 shadow-[0_0_50px_0_rgba(192,132,252,0.2)]
           border-l border-purple-100/20 dark:border-purple-900/20"
        >
          <div className="mx-auto h-12 w-20 relative group mt-2">
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl transform rotate-3 
            transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-purple-500/30"
            />
            <div
              className="absolute inset-[2px] bg-white dark:bg-gray-800 rounded-[10px] flex items-center justify-center transform -rotate-3 
            transition-all duration-700 group-hover:-rotate-6"
            >
              <span
                className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent
              transition-all duration-700 group-hover:scale-110"
              >
                پارسیم
              </span>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 
                hover:bg-gradient-to-r hover:from-purple-50/80 hover:to-pink-50/80 dark:hover:from-gray-700/80 dark:hover:to-gray-600/80 
                transition-all duration-300 transform hover:shadow-lg hover:shadow-purple-500/10 relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/0 to-pink-400/0 
                group-hover:from-purple-400/10 group-hover:via-purple-400/10 group-hover:to-pink-400/10 transition-all duration-500"
                />
                <item.icon
                  className="ml-3 h-5 w-5 text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 
                transition-all duration-300 transform group-hover:-rotate-12"
                />
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="md:pr-64">
        <header className="fixed top-0 right-0 left-0 md:right-64 z-30">
          <div
            className="bg-gradient-to-r from-white/95 via-white/90 to-white/95 backdrop-blur-xl 
          dark:from-gray-800/95 dark:via-gray-800/90 dark:to-gray-800/95 
          shadow-[0_4px_30px_-10px_rgba(192,132,252,0.3)] border-b border-purple-100/20 dark:border-purple-900/20"
          >
            <div className="flex h-16 items-center justify-between px-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100/80 dark:text-gray-400 dark:hover:bg-gray-700/80 
                transition-all duration-300 hover:rotate-180"
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
                  onClick={() => setShowSettings(true)}
                  className="p-2 rounded-lg text-gray-500 hover:text-purple-600 
                  dark:text-gray-400 dark:hover:text-purple-400 transition-all duration-300 
                  hover:rotate-180 hover:scale-110 relative after:absolute after:inset-0 
                  after:bg-gradient-to-r after:from-purple-400/0 after:via-purple-400/10 
                  after:to-purple-400/0 after:rounded-lg after:opacity-0 hover:after:opacity-100 
                  after:transition-opacity after:duration-300"
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
          <div className="px-4 py-6 mx-auto">
            <div
              className="p-3 transition-all duration-300"
            >
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
