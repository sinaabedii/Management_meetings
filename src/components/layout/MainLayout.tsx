import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
import { SiGotomeeting } from "react-icons/si";
import clsx from "clsx";
import ProfileMenu from "../common/ProfileMenu";
import NotificationsDropdown from "../common/NotificationsDropdown";
import SearchDropdown from "../common/SearchDropdown";
import SettingsModal from "../settings/SettingsModal";

const navigation = [
  { name: "داشبورد", href: "/", icon: HomeIcon },
  { name: "تقویم", href: "/calendar", icon: CalendarIcon },
  { name: "جلسات", href: "/meetings", icon: SiGotomeeting },
  { name: "کاربران", href: "/users", icon: UsersIcon },
  { name: "گزارش‌ها", href: "/reports", icon: ChartBarIcon },
  { name: "فایل‌ها", href: "/files", icon: FolderIcon },
];

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: 300 }}
        animate={{ x: sidebarOpen ? 0 : 300 }}
        transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
        className="fixed inset-y-0 right-0 z-50 w-72 bg-white/90 rounded-l-2xl 
          backdrop-blur-xl dark:bg-gray-800/95 shadow-2xl md:hidden"
      >
        <div className="h-full flex flex-col">
          {/* Mobile Header */}
          <div className="relative mx-auto w-full p-4 border-b border-purple-100/20 
            dark:border-purple-900/20">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-12 rounded-xl bg-gradient-to-r from-purple-500/5 
                to-blue-500/5 p-[1px] overflow-hidden group"
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 
                  to-blue-600 animate-border-flow" />
              </div>
              
              <div className="relative h-full rounded-xl bg-white/80 dark:bg-gray-800/80 
                backdrop-blur-sm flex items-center justify-center">
                <div className="absolute inset-0 bg-grid-gray-500/[0.025] bg-[size:20px_20px]" />
                <span className="text-xl font-bold bg-gradient-to-br from-gray-900 
                  to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  پارسیم
                </span>
              </div>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 px-4 py-4 overflow-y-auto">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="group relative flex items-center p-4 my-1 rounded-xl text-sm 
                    font-medium text-gray-700 dark:text-gray-200 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-50 
                    to-blue-50 dark:from-purple-900/40 dark:to-blue-900/40 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                    <div className="absolute inset-[-20px] bg-gradient-to-r 
                      from-purple-500/10 to-blue-500/10 blur-3xl group-hover:animate-glow" />
                  </div>

                  <item.icon className="relative h-5 w-5 ml-3 text-gray-400 
                    group-hover:text-purple-600 dark:group-hover:text-purple-400 
                    transition-all duration-300 transform group-hover:scale-110 
                    group-hover:rotate-6" />

                  <span className="relative transform transition-all duration-300 
                    group-hover:translate-x-1 group-hover:text-purple-600 
                    dark:group-hover:text-purple-400">
                    {item.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:right-0 md:flex md:w-72">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex flex-col flex-1 relative w-full"
        >
          {/* Background with animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 
            to-white/95 dark:from-gray-800/95 dark:via-gray-800/90 dark:to-gray-800/95 
            backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] 
              from-purple-400/10 via-transparent to-transparent animate-pulse-slow" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] 
              from-blue-400/10 via-transparent to-transparent animate-pulse-slow" />
          </div>

          {/* Content Container */}
          <div className="relative flex flex-col flex-1 border-l border-purple-100/20 
            dark:border-purple-900/20 shadow-[0_0_50px_0_rgba(192,132,252,0.2)]">
            
            {/* Logo Section */}
            <div className="relative mx-auto w-full px-6 py-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative h-16 rounded-2xl bg-gradient-to-r from-purple-500/5 
                  to-blue-500/5 p-[1px] overflow-hidden group"
              >
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 
                    to-blue-600 animate-border-flow" />
                </div>
                
                <div className="relative h-full rounded-2xl bg-white/80 dark:bg-gray-800/80 
                  backdrop-blur-sm flex items-center justify-center">
                  <div className="absolute inset-0 bg-grid-gray-500/[0.025] bg-[size:20px_20px]" />
                  <span className="text-2xl font-bold bg-gradient-to-br from-gray-900 
                    to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                    پارسیم
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 pb-4 space-y-1 overflow-y-auto">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className="group relative flex items-center p-3 my-1 rounded-xl text-sm 
                      font-medium text-gray-700 dark:text-gray-200 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-50 
                      to-blue-50 dark:from-purple-900/40 dark:to-blue-900/40 opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                      <div className="absolute inset-[-20px] bg-gradient-to-r 
                        from-purple-500/10 to-blue-500/10 blur-3xl group-hover:animate-glow" />
                    </div>

                    <item.icon className="relative h-5 w-5 ml-3 text-gray-400 
                      group-hover:text-purple-600 dark:group-hover:text-purple-400 
                      transition-all duration-300 transform group-hover:scale-110 
                      group-hover:rotate-6" />

                    <span className="relative transform transition-all duration-300 
                      group-hover:translate-x-1 group-hover:text-purple-600 
                      dark:group-hover:text-purple-400">
                      {item.name}
                    </span>

                    <div className="absolute left-2 transform -translate-x-full opacity-0 
                      group-hover:translate-x-0 group-hover:opacity-100 transition-all 
                      duration-300">
                      <svg className="w-4 h-4 text-purple-500" fill="none" 
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" 
                          strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Decoration */}
            <div className="relative p-4">
              <div className="h-1 w-full bg-gradient-to-r from-transparent 
                via-purple-500/20 to-transparent rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="md:pr-72">
        {/* Header */}
        <header className="fixed top-0 right-0 left-0 md:right-72 z-30">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl 
            shadow-lg shadow-purple-500/10 border-b border-purple-100/20 
            dark:border-purple-900/20">
            <div className="flex h-16 items-center justify-between px-4">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg text-gray-500 hover:text-purple-600 
                  dark:text-gray-400 dark:hover:text-purple-400"
              >
                <Bars3Icon className="h-5 w-5" />
              </motion.button>

              <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-start">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <SearchDropdown />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <NotificationsDropdown />
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowSettings(true)}
                  className="p-2 rounded-lg text-gray-500 hover:text-purple-600 
                    dark:text-gray-400 dark:hover:text-purple-400"
                >
                  <Cog6ToothIcon className="h-5 w-5" />
                </motion.button>
                <ProfileMenu />
              </div>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="pt-16">
          <div className="px-4 py-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="transition-all duration-300"
            >
              <Outlet />
            </motion.div>
          </div>
        </main>
      </div>

      {/* Settings Modal */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
};

export default MainLayout;