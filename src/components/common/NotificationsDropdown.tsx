import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon, CalendarIcon, ClipboardDocumentIcon, CommandLineIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: number;
  type: "meeting" | "task" | "system";
  title: string;
  message: string;
  date: Date;
  read: boolean;
  link?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "meeting",
    title: "جلسه جدید",
    message: "جلسه برنامه‌ریزی اسپرینت در ساعت 14:00 برگزار می‌شود",
    date: new Date(),
    read: false,
    link: "/meetings/1",
  },
  {
    id: 2,
    type: "task",
    title: "مهلت مصوبه",
    message: 'مهلت انجام مصوبه "تهیه مستندات" فردا به پایان می‌رسد',
    date: new Date(),
    read: false,
    link: "/tasks/1",
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "meeting":
      return CalendarIcon;
    case "task":
      return ClipboardDocumentIcon;
    default:
      return CommandLineIcon;
  }
};

const NotificationItem: React.FC<{ notification: Notification }> = ({
  notification,
}) => {
  const Icon = getNotificationIcon(notification.type);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 backdrop-blur-sm transition-all duration-300
        ${notification.read 
          ? "bg-white/30 dark:bg-gray-800/30" 
          : "bg-gradient-to-r from-purple-50/80 to-blue-50/80 dark:from-purple-900/30 dark:to-blue-900/30"
        }`}
    >
      <div className="flex items-start">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          className="flex-shrink-0"
        >
          <div className={`h-10 w-10 rounded-xl flex items-center justify-center 
            ${!notification.read
              ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10"
              : "bg-gradient-to-r from-gray-500/10 to-gray-500/10"
            }`}
          >
            <Icon className={`h-5 w-5 
              ${!notification.read
                ? "text-purple-500 dark:text-purple-400"
                : "text-gray-400 dark:text-gray-500"
              }`} 
            />
          </div>
        </motion.div>

        <div className="mr-4 w-0 flex-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {notification.title}
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {notification.message}
          </p>
          <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            {format(notification.date, "HH:mm - yyyy/MM/dd")}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <Menu as="div" className="relative inline-block text-right">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Menu.Button className="relative rounded-xl bg-white/80 dark:bg-gray-800/80 
          p-2 text-gray-500 hover:text-purple-600 dark:text-gray-400 
          dark:hover:text-purple-400 hover:bg-white/90 dark:hover:bg-gray-700/90 
          transition-all duration-300 backdrop-blur-sm shadow-lg shadow-purple-500/5
          hover:shadow-purple-500/10">
          <span className="sr-only">اعلان‌ها</span>
          <BellIcon className="h-5 w-5" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-0.5 -right-0.5 flex items-center justify-center 
                  w-4 h-4 text-[10px] font-bold text-white bg-gradient-to-r 
                  from-purple-500 to-blue-500 rounded-full ring-2 ring-white 
                  dark:ring-gray-800"
              >
                {unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Menu.Button>
      </motion.div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-50 mt-2 w-96 origin-top-right 
          rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow-xl 
          shadow-purple-500/10 ring-1 ring-black/5 focus:outline-none 
          backdrop-blur-xl transform transition-all duration-300
          max-sm:w-[calc(100vw-2rem)] max-sm:right-[-13rem]">
          {/* Header */}
          <div className="p-4 border-b border-purple-100/20 dark:border-purple-900/20">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium bg-gradient-to-r from-purple-600 
                to-blue-600 bg-clip-text text-transparent">
                اعلان‌ها
              </h3>
              {unreadCount > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={markAllAsRead}
                  className="text-sm text-purple-500 hover:text-purple-600 
                    dark:text-purple-400 dark:hover:text-purple-300 
                    transition-colors duration-300"
                >
                  علامت‌گذاری همه
                </motion.button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-[60vh] overflow-y-auto divide-y 
            divide-purple-100/20 dark:divide-purple-900/20 
            scrollbar-thin scrollbar-thumb-purple-500/20 
            hover:scrollbar-thumb-purple-500/30">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Menu.Item key={notification.id}>
                  {({ active }) => <NotificationItem notification={notification} />}
                </Menu.Item>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center text-gray-500 dark:text-gray-400"
              >
                <div className="flex flex-col items-center space-y-3">
                  <BellIcon className="h-12 w-12 text-gray-400/50" />
                  <p>اعلان جدیدی وجود ندارد</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-4 border-t border-purple-100/20 dark:border-purple-900/20">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-center text-sm bg-gradient-to-r 
                  from-purple-500 to-blue-500 text-white py-2.5 px-4 
                  rounded-xl shadow-lg shadow-purple-500/20 
                  hover:shadow-purple-500/30 transition-all duration-300"
              >
                مشاهده همه اعلان‌ها
              </motion.button>
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NotificationsDropdown;