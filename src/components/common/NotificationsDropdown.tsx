import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

interface Notification {
  id: number;
  type: 'meeting' | 'task' | 'system';
  title: string;
  message: string;
  date: Date;
  read: boolean;
  link?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: 'meeting',
    title: 'جلسه جدید',
    message: 'جلسه برنامه‌ریزی اسپرینت در ساعت 14:00 برگزار می‌شود',
    date: new Date(),
    read: false,
    link: '/meetings/1'
  },
  {
    id: 2,
    type: 'task',
    title: 'مهلت مصوبه',
    message: 'مهلت انجام مصوبه "تهیه مستندات" فردا به پایان می‌رسد',
    date: new Date(),
    read: false,
    link: '/tasks/1'
  },
  // ... سایر اعلان‌ها
];

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => (
  <div className={`p-4 ${notification.read ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-blue-900'}`}>
    <div className="flex items-start">
      <div className="flex-shrink-0">
        {notification.type === 'meeting' && (
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
            <BellIcon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
          </div>
        )}
        {/* می‌توانید آیکون‌های متفاوت برای انواع مختلف اعلان اضافه کنید */}
      </div>
      <div className="mr-3 w-0 flex-1">
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          {notification.title}
        </div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {notification.message}
        </p>
        <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          {format(notification.date, 'HH:mm - yyyy/MM/dd')}
        </div>
      </div>
    </div>
  </div>
);

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <Menu as="div" className="relative inline-block text-right">
      <div>
        <Menu.Button className="relative rounded-full bg-white dark:bg-gray-800 p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
          <span className="sr-only">اعلان‌ها</span>
          <BellIcon className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {unreadCount}
            </span>
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-96 origin-top-left rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">اعلان‌ها</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400"
                >
                  علامت‌گذاری همه به عنوان خوانده شده
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Menu.Item key={notification.id}>
                  {({ active }) => (
                    <div className={active ? 'bg-gray-50 dark:bg-gray-700' : ''}>
                      <NotificationItem notification={notification} />
                    </div>
                  )}
                </Menu.Item>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                اعلان جدیدی وجود ندارد
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                className="w-full text-center text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400"
              >
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