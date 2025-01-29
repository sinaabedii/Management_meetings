import React, { useState } from "react";
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
  const [activeTab, setActiveTab] = useState<
    "profile" | "settings" | "notifications"
  >("profile");
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
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-x-4">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
            alt={user?.name}
            className="h-20 w-20 rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {user?.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user?.role === "admin"
                ? "مدیر سیستم"
                : user?.role === "manager"
                ? "مدیر"
                : "کاربر"}
            </p>
          </div>
        </div>
        <button onClick={() => setIsEditing(true)} className="btn-primary">
          ویرایش پروفایل
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              نام و نام خانوادگی
            </label>
            <input
              type="text"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              className="input-primary mt-1 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              ایمیل
            </label>
            <input
              type="email"
              value={editData.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
              className="input-primary mt-1 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              شماره تماس
            </label>
            <input
              type="tel"
              value={editData.phone}
              onChange={(e) =>
                setEditData({ ...editData, phone: e.target.value })
              }
              className="input-primary mt-1 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              دپارتمان
            </label>
            <input
              type="text"
              value={editData.department}
              onChange={(e) =>
                setEditData({ ...editData, department: e.target.value })
              }
              className="input-primary mt-1 w-full"
            />
          </div>

          <div className="flex justify-end space-x-4 space-x-reverse">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn-secondary"
            >
              انصراف
            </button>
            <button type="submit" className="btn-primary">
              ذخیره تغییرات
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              <span className="text-gray-900 dark:text-white">
                {user?.email}
              </span>
            </div>
            <div className="flex items-center gap-x-2">
              <PhoneIcon className="h-5 w-5 text-gray-400" />
              <span className="text-gray-900 dark:text-white">09123456789</span>
            </div>
            <div className="flex items-center gap-x-2">
              <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
              <span className="text-gray-900 dark:text-white">
                {user?.department}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                آخرین فعالیت‌ها
              </h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>ورود به سیستم - دیروز 15:30</p>
                <p>ویرایش جلسه - دیروز 14:20</p>
                <p>ایجاد جلسه جدید - دیروز 10:15</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSettingsContent = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          تغییر رمز عبور
        </h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              رمز عبور فعلی
            </label>
            <input type="password" className="input-primary mt-1 w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              رمز عبور جدید
            </label>
            <input type="password" className="input-primary mt-1 w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              تکرار رمز عبور جدید
            </label>
            <input type="password" className="input-primary mt-1 w-full" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">
              تغییر رمز عبور
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          تنظیمات شخصی‌سازی
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">
              نمایش اعلان‌های ایمیل
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">
              نمایش اعلان‌های سیستم
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsContent = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          اعلان‌های اخیر
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-x-3">
            <div className="flex-shrink-0">
              <BellIcon className="h-6 w-6 text-primary-500" />
            </div>
            <div>
              <p className="text-gray-900 dark:text-white">
                جلسه جدید ایجاد شد
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                جلسه برنامه‌ریزی پروژه - امروز ساعت 14:00
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                10 دقیقه پیش
              </p>
            </div>
          </div>
          <div className="flex items-start gap-x-3">
            <div className="flex-shrink-0">
              <KeyIcon className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-gray-900 dark:text-white">تغییر رمز عبور</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                رمز عبور شما با موفقیت تغییر کرد
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                دیروز ساعت 16:45
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          تنظیمات اعلان‌ها
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              نوع اعلان‌ها
            </label>
            <div className="mt-2 space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                  defaultChecked
                />
                <span className="mr-2 text-gray-700 dark:text-gray-300">
                  جلسات جدید
                </span>
              </label>
              <br />
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                  defaultChecked
                />
                <span className="mr-2 text-gray-700 dark:text-gray-300">
                  یادآوری جلسات
                </span>
              </label>
              <br />
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                  defaultChecked
                />
                <span className="mr-2 text-gray-700 dark:text-gray-300">
                  تغییرات در جلسات
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav
            className="-mb-px flex space-x-8 space-x-reverse"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`
                  flex items-center gap-x-2 py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? "border-primary-500 text-primary-600 dark:text-primary-500"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }
                `}
              >
                <tab.icon className="h-5 w-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        {activeTab === "profile" && renderProfileContent()}
        {activeTab === "settings" && renderSettingsContent()}
        {activeTab === "notifications" && renderNotificationsContent()}
      </div>
    </div>
  );
};

export default Profile;
