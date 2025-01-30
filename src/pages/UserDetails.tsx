import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ClockIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

const MOCK_USER = {
  id: 1,
  name: "علی محمدی",
  email: "ali@example.com",
  role: "مدیر پروژه",
  department: "مدیریت پروژه",
  phone: "0912-345-6789",
  status: "active",
  avatar: `https://api.dicebear.com/7.x/initials/svg?seed=علی محمدی`,
  lastActive: "10 دقیقه پیش",
  joinDate: "1402/06/15",
  meetingsAttended: 45,
  meetingsOrganized: 12,
  completedTasks: 89,
  recentMeetings: [
    {
      id: 1,
      title: "جلسه برنامه‌ریزی اسپرینت",
      date: "1402/11/15",
      status: "completed"
    },
    {
      id: 2,
      title: "بررسی پیشرفت پروژه",
      date: "1402/11/10",
      status: "scheduled"
    }
  ],
  recentActivities: [
    {
      type: "meeting",
      description: "جلسه برنامه‌ریزی اسپرینت را ایجاد کرد",
      date: "1402/11/15"
    },
    {
      type: "task",
      description: "مصوبه جدید اضافه کرد",
      date: "1402/11/14"
    }
  ]
};

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // در نسخه واقعی، اطلاعات کاربر از API دریافت می‌شود
  const user = MOCK_USER;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/users')}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <span className="ml-2">←</span>
        بازگشت به لیست کاربران
      </button>

      {/* اطلاعات اصلی کاربر */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-24 w-24 rounded-full"
            />
            <div className="mr-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {user.role}
              </p>
              <span
                className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  user.status === 'active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}
              >
                {user.status === 'active' ? 'فعال' : 'غیرفعال'}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate(`/users/${id}/edit`)}
            className="btn-primary"
          >
            ویرایش پروفایل
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="flex items-center">
            <EnvelopeIcon className="h-5 w-5 text-gray-400 ml-2" />
            <span className="text-gray-600 dark:text-gray-300">{user.email}</span>
          </div>
          <div className="flex items-center">
            <PhoneIcon className="h-5 w-5 text-gray-400 ml-2" />
            <span className="text-gray-600 dark:text-gray-300">{user.phone}</span>
          </div>
          <div className="flex items-center">
            <BuildingOfficeIcon className="h-5 w-5 text-gray-400 ml-2" />
            <span className="text-gray-600 dark:text-gray-300">{user.department}</span>
          </div>
        </div>
      </div>

      {/* آمار کاربر */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <CalendarIcon className="h-10 w-10 text-blue-500" />
            <div className="mr-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                جلسات شرکت کرده
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.meetingsAttended}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <ClockIcon className="h-10 w-10 text-green-500" />
            <div className="mr-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                جلسات برگزار کرده
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.meetingsOrganized}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <DocumentCheckIcon className="h-10 w-10 text-purple-500" />
            <div className="mr-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                مصوبات تکمیل شده
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.completedTasks}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* جلسات اخیر و فعالیت‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            جلسات اخیر
          </h2>
          <div className="space-y-4">
            {user.recentMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {meeting.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {meeting.date}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    meeting.status === 'completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                  }`}
                >
                  {meeting.status === 'completed' ? 'برگزار شده' : 'برنامه‌ریزی شده'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            فعالیت‌های اخیر
          </h2>
          <div className="space-y-4">
            {user.recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">
                    {activity.description}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;