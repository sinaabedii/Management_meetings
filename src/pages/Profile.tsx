import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import {
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  KeyIcon,
  BellIcon,
  UserIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"profile" | "settings" | "notifications">("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "09123456789",
    department: user?.department || "",
  });

  const tabs = [
    { id: "profile", name: "پروفایل", icon: UserIcon },
    { id: "settings", name: "تنظیمات", icon: CogIcon },
    { id: "notifications", name: "اعلان‌ها", icon: BellIcon },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated profile:", editData);
    setIsEditing(false);
  };

  const renderProfileContent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div className="flex items-center gap-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-30" />
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
              alt={user?.name}
              className="h-20 w-20 rounded-full ring-2 ring-purple-500/20 relative"
            />
          </motion.div>
          <div>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 
            bg-clip-text text-transparent">
              {user?.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user?.role === "admin" ? "مدیر سیستم" : user?.role === "manager" ? "مدیر" : "کاربر"}
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl 
          shadow-lg shadow-purple-500/30 hover:shadow-blue-500/40 transition-all duration-300"
        >
          ویرایش پروفایل
        </motion.button>
      </div>

      {isEditing ? (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* فیلدهای فرم */}
          {[
            { label: "نام و نام خانوادگی", name: "name", type: "text" },
            { label: "ایمیل", name: "email", type: "email" },
            { label: "شماره تماس", name: "phone", type: "tel" },
            { label: "دپارتمان", name: "department", type: "text" }
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 
              bg-clip-text text-transparent">
                {field.label}
              </label>
              <input
                type={field.type}
                value={editData[field.name as keyof typeof editData]}
                onChange={(e) => setEditData({ ...editData, [field.name]: e.target.value })}
                className="w-full px-4 py-3 mt-1 rounded-xl bg-white/50 dark:bg-gray-800/50 
                backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30
                focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
              />
            </div>
          ))}

          <div className="flex justify-end space-x-4 space-x-reverse">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl"
            >
              انصراف
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl 
              shadow-lg shadow-purple-500/30 hover:shadow-blue-500/40 transition-all duration-300"
            >
              ذخیره تغییرات
            </motion.button>
          </div>
        </motion.form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {[
              { icon: EnvelopeIcon, value: user?.email, label: "ایمیل" },
              { icon: PhoneIcon, value: "09123456789", label: "تلفن" },
              { icon: BuildingOfficeIcon, value: user?.department, label: "دپارتمان" }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-x-3 p-4 rounded-xl bg-gradient-to-r 
                from-purple-500/5 to-blue-500/5 hover:from-purple-500/10 hover:to-blue-500/10 
                transition-all duration-300"
              >
                <item.icon className="h-5 w-5 text-purple-500" />
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 block">{item.label}</span>
                  <span className="text-gray-900 dark:text-white">{item.value}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl p-6"
          >
            <h4 className="font-medium bg-gradient-to-r from-purple-600 to-blue-600 
            bg-clip-text text-transparent mb-4">
              آخرین فعالیت‌ها
            </h4>
            <div className="space-y-3">
              {[
                "ورود به سیستم - دیروز 15:30",
                "ویرایش جلسه - دیروز 14:20",
                "ایجاد جلسه جدید - دیروز 10:15"
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 rounded-lg hover:bg-white/30 dark:hover:bg-gray-700/30 
                  transition-all duration-300"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );

  const renderSettingsContent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl p-6"
      >
        <h3 className="text-lg font-medium bg-gradient-to-r from-purple-600 to-blue-600 
        bg-clip-text text-transparent mb-4">
          تغییر رمز عبور
        </h3>
        <form className="space-y-4">
          {[
            { label: "رمز عبور فعلی", type: "password" },
            { label: "رمز عبور جدید", type: "password" },
            { label: "تکرار رمز عبور جدید", type: "password" }
          ].map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field.label}
              </label>
              <input
                type={field.type}
                className="w-full px-4 py-3 mt-1 rounded-xl bg-white/50 dark:bg-gray-800/50 
                backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30
                focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
              />
            </div>
          ))}
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl 
              shadow-lg shadow-purple-500/30 hover:shadow-blue-500/40 transition-all duration-300"
            >
              تغییر رمز عبور
            </motion.button>
          </div>
        </form>
      </motion.div>

      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl p-6"
      >
        <h3 className="text-lg font-medium bg-gradient-to-r from-purple-600 to-blue-600 
        bg-clip-text text-transparent mb-4">
          تنظیمات شخصی‌سازی
        </h3>
        <div className="space-y-4">
          {[
            { label: "نمایش اعلان‌های ایمیل", checked: true },
            { label: "نمایش اعلان‌های سیستم", checked: true }
          ].map((setting, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/30 
              dark:hover:bg-gray-700/30 transition-all duration-300"
            >
              <span className="text-gray-700 dark:text-gray-300">{setting.label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={setting.checked} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer 
                dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white 
                after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r 
                peer-checked:from-purple-500 peer-checked:to-blue-500"></div>
              </label>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  const renderNotificationsContent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl p-6"
      >
        <h3 className="text-lg font-medium bg-gradient-to-r from-purple-600 to-blue-600 
        bg-clip-text text-transparent mb-4">
          اعلان‌های اخیر
        </h3>
        <div className="space-y-4">
          {[
            {
              icon: BellIcon,
              title: "جلسه جدید ایجاد شد",
              description: "جلسه برنامه‌ریزی پروژه - امروز ساعت 14:00",
              time: "10 دقیقه پیش",
              color: "text-purple-500"
            },
            {
              icon: KeyIcon,
              title: "تغییر رمز عبور",
              description: "رمز عبور شما با موفقیت تغییر کرد",
              time: "دیروز ساعت 16:45",
              color: "text-yellow-500"
            }
          ].map((notification, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="flex items-start gap-x-3 p-4 rounded-xl hover:bg-white/30 
              dark:hover:bg-gray-700/30 transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <notification.icon className={`h-6 w-6 ${notification.color}`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  {notification.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {notification.description}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl p-6"
      >
        <h3 className="text-lg font-medium bg-gradient-to-r from-purple-600 to-blue-600 
        bg-clip-text text-transparent mb-4">
          تنظیمات اعلان‌ها
        </h3>
        <div className="space-y-4">
          {[
            "جلسات جدید",
            "یادآوری جلسات",
            "تغییرات در جلسات"
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-center gap-x-3 p-3 rounded-xl hover:bg-white/30 
              dark:hover:bg-gray-700/30 transition-all duration-300"
            >
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-purple-600 shadow-sm 
                  focus:border-purple-300 focus:ring focus:ring-purple-200 
                  focus:ring-opacity-50 transition-all duration-300"
                />
                <span className="mr-2 text-gray-700 dark:text-gray-300">{item}</span>
              </label>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header Tabs */}
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="mb-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl 
        border border-gray-200/30 dark:border-gray-700/30 p-2"
      >
        <nav className="flex space-x-8 space-x-reverse" aria-label="Tabs">
          {tabs.map((tab) => (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`
                flex items-center gap-x-2 py-3 px-4 rounded-xl font-medium text-sm
                transition-all duration-300
                ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-gray-700/50"
                }
              `}
            >
              <tab.icon className="h-5 w-5" />
              {tab.name}
            </motion.button>
          ))}
        </nav>
      </motion.div>

      <motion.div 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl 
        border border-gray-200/30 dark:border-gray-700/30 shadow-lg p-8"
      >
        {activeTab === "profile" && renderProfileContent()}
        {activeTab === "settings" && renderSettingsContent()}
        {activeTab === "notifications" && renderNotificationsContent()}
      </motion.div>
    </motion.div>
  );
};

export default Profile;