import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import {
  UserIcon,
  CogIcon,
  KeyIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";

const ProfileMenu = () => {
  const { user, logout } = useAuth();

  const menuItems = [
    {
      name: "پروفایل من",
      href: "/profile",
      icon: UserIcon,
    },
    {
      name: "تنظیمات",
      href: "/settings",
      icon: CogIcon,
    },
    {
      name: "تغییر رمز عبور",
      href: "/change-password",
      icon: KeyIcon,
    },
    {
      name: "اعلان‌ها",
      href: "/notifications",
      icon: BellIcon,
    },
  ];

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-x-2 rounded-full bg-white dark:bg-gray-800 p-1 focus:outline-none">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
          alt={user?.name}
          className="h-8 w-8 rounded-full"
        />
        <div className="hidden md:block text-right">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {user?.name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {user?.role === "admin"
              ? "مدیر سیستم"
              : user?.role === "manager"
              ? "مدیر"
              : "کاربر"}
          </div>
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm text-gray-900 dark:text-white">
              {user?.name}
            </p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700">
            {menuItems.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <Link
                    to={item.href}
                    className={`${
                      active ? "bg-gray-100 dark:bg-gray-700" : ""
                    } px-4 py-2 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-x-2`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`${
                    active ? "bg-gray-100 dark:bg-gray-700" : ""
                  } w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-x-2`}
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  خروج
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileMenu;
