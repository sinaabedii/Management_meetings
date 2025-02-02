import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

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
  // ... سایر اعلان‌ها
];

const NotificationItem: React.FC<{ notification: Notification }> = ({
  notification,
}) => (
  <div
    className={`p-4 backdrop-blur-sm transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-800/50 ${
      notification.read
        ? "bg-white/30 dark:bg-gray-800/30"
        : "bg-gradient-to-r from-blue-50/90 to-purple-50/90 dark:from-blue-900/30 dark:to-purple-900/30"
    }`}
  >
    <div className="flex items-start">
      <div className="flex-shrink-0">
        {notification.type === "meeting" && (
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-800 dark:to-purple-800 flex items-center justify-center shadow-sm transition-transform duration-200 hover:scale-105">
            <BellIcon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
          </div>
        )}
      </div>
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
  </div>
);

const NotificationsDropdown = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <Menu as="div" className="relative inline-block text-right">
      <div>
        <Menu.Button className="relative rounded-xl bg-white/80 dark:bg-gray-800/80 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 backdrop-blur-sm">
          <span className="sr-only">اعلان‌ها</span>
          <BellIcon className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0 -right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white transform translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-red-500 to-pink-500 dark:from-red-600 dark:to-pink-600 rounded-full ring-2 ring-white dark:ring-gray-800 transition-transform duration-200 hover:scale-110">
              {unreadCount}
            </span>
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 z-50 mt-2 w-82 origin-top-left rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow-xl ring-1 ring-black/5 focus:outline-none backdrop-blur-lg transform transition-all duration-200 
          sm:w-96 
          xs:w-screen xs:left-0 xs:right-0 xs:mx-4
          md:left-2 md:right-auto md:mx-0
          max-sm:fixed max-sm:left-4 max-sm:right-4 max-sm:top-16"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                اعلان‌ها
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 transition-colors duration-200 hover:underline"
                >
                  علامت‌گذاری همه
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-[60vh] sm:max-h-96 overflow-y-auto divide-y divide-gray-200/50 dark:divide-gray-700/50 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Menu.Item key={notification.id}>
                  {({ active }) => (
                    <div>
                      <NotificationItem notification={notification} />
                    </div>
                  )}
                </Menu.Item>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <div className="flex flex-col items-center space-y-3">
                  <BellIcon className="h-12 w-12 text-gray-400/50" />
                  <p>اعلان جدیدی وجود ندارد</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
              <button className="w-full text-center text-sm bg-gradient-to-r from-primary-600 to-primary-500 text-white py-2.5 px-4 rounded-xl hover:from-primary-500 hover:to-primary-400 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
                مشاهده همه اعلان‌ها
              </button>
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NotificationsDropdown;
