import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
      color: "from-purple-500 to-blue-500",
    },
    {
      name: "تنظیمات",
      href: "/settings",
      icon: CogIcon,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "تغییر رمز عبور",
      href: "/change-password",
      icon: KeyIcon,
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "اعلان‌ها",
      href: "/notifications",
      icon: BellIcon,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button className="group flex items-center gap-x-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 
          backdrop-blur-sm p-2 pr-3 border border-gray-200/30 dark:border-gray-700/30 
          transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full 
              blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
                alt={user?.name}
                className="h-9 w-9 rounded-full ring-2 ring-purple-500/20 relative"
              />
            </motion.div>
            <div className="hidden md:block text-right">
              <div className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 
              bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-blue-500 
              transition-all duration-300">
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
            <div className={`w-2 h-2 rounded-full bg-green-500 ring-2 ring-green-500/30 
            absolute top-2 right-2 ${open ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 z-50 mt-2 w-72 origin-top-left rounded-2xl 
            bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl shadow-xl ring-1 ring-black/5 
            focus:outline-none border border-gray-200/30 dark:border-gray-700/30">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-4 text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative inline-block"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 
                    rounded-full blur-md opacity-20" />
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
                      alt={user?.name}
                      className="h-16 w-16 rounded-full ring-2 ring-purple-500/20 mx-auto relative"
                    />
                  </motion.div>
                  <p className="mt-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 
                  bg-clip-text text-transparent">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                    {user?.email}
                  </p>
                </div>

                <div className="border-t border-gray-200/50 dark:border-gray-700/50 py-2">
                  {menuItems.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link
                          to={item.href}
                          className="block"
                        >
                          <motion.div
                            whileHover={{ x: 4 }}
                            className={`
                              px-4 py-2.5 mx-2 rounded-xl text-sm flex items-center gap-x-3
                              transition-colors duration-200
                              ${active 
                                ? `bg-gradient-to-r ${item.color} text-white shadow-sm` 
                                : 'text-gray-700 dark:text-gray-300'
                              }
                            `}
                          >
                            <item.icon className={`h-5 w-5 ${!active && 'text-gray-500'}`} />
                            {item.name}
                          </motion.div>
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>

                <div className="border-t border-gray-200/50 dark:border-gray-700/50 p-2">
                  <Menu.Item>
                    {({ active }) => (
                      <motion.button
                        whileHover={{ x: 4 }}
                        onClick={logout}
                        className={`
                          w-full px-4 py-2.5 mx-2 rounded-xl text-sm flex items-center gap-x-3
                          transition-colors duration-200
                          ${active 
                            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-sm' 
                            : 'text-red-600 dark:text-red-400'
                          }
                        `}
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        خروج
                      </motion.button>
                    )}
                  </Menu.Item>
                </div>
              </motion.div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default ProfileMenu;