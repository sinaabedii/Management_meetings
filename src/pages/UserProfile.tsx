import { useParams } from 'react-router-dom';
import {
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ClockIcon,
  DocumentCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

interface Activity {
  date: string;
  meetings: number;
  tasks: number;
}

const activityData: Activity[] = [
  { date: 'فروردین', meetings: 5, tasks: 8 },
  { date: 'اردیبهشت', meetings: 7, tasks: 12 },
  { date: 'خرداد', meetings: 4, tasks: 6 },
  { date: 'تیر', meetings: 8, tasks: 15 },
  { date: 'مرداد', meetings: 6, tasks: 10 },
  { date: 'شهریور', meetings: 9, tasks: 14 }
];

const taskCompletionData = [
  { name: 'به موقع', value: 75 },
  { name: 'با تاخیر', value: 20 },
  { name: 'ناتمام', value: 5 }
];

const MOCK_USER = {
  id: 1,
  name: "علی محمدی",
  email: "ali@example.com",
  role: "مدیر پروژه",
  department: "مدیریت",
  phone: "0912-345-6789",
  status: "active" as const,
  avatar: `https://api.dicebear.com/7.x/initials/svg?seed=علی محمدی`,
  lastActive: "10 دقیقه پیش",
  meetingsAttended: 45,
  meetingsOrganized: 12,
  completedTasks: 89,
  bio: "مدیر پروژه با بیش از 5 سال سابقه در مدیریت پروژه‌های نرم‌افزاری",
  skills: ["مدیریت پروژه", "اسکرام", "رهبری تیم", "برنامه‌ریزی استراتژیک"],
  recentActivities: [
    {
      type: 'meeting',
      title: 'جلسه برنامه‌ریزی اسپرینت',
      date: '2024/01/25',
      status: 'completed'
    },
    {
      type: 'task',
      title: 'بررسی گزارش‌های ماهانه',
      date: '2024/01/24',
      status: 'inProgress'
    }
  ]
};

const UserProfile = () => {
  // const { id } = useParams<{ id: string }>();
  const user = MOCK_USER; 

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header/Bio Section */}
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
                className={`mt-2 inline-flex px-3 py-1 rounded-full text-sm font-medium
                  ${
                    user.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}
              >
                {user.status === 'active' ? 'فعال' : 'غیرفعال'}
              </span>
            </div>
          </div>
          <button className="btn-primary">ویرایش پروفایل</button>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            درباره
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <EnvelopeIcon className="h-5 w-5 text-gray-400 ml-2" />
            <span className="text-gray-700 dark:text-gray-300">{user.email}</span>
          </div>
          <div className="flex items-center">
            <PhoneIcon className="h-5 w-5 text-gray-400 ml-2" />
            <span className="text-gray-700 dark:text-gray-300">{user.phone}</span>
          </div>
          <div className="flex items-center">
            <BuildingOfficeIcon className="h-5 w-5 text-gray-400 ml-2" />
            <span className="text-gray-700 dark:text-gray-300">
              {user.department}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <CalendarIcon className="h-10 w-10 text-blue-500" />
            <div className="mr-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                جلسات شرکت کرده
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {user.meetingsAttended}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <ClockIcon className="h-10 w-10 text-green-500" />
            <div className="mr-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                جلسات برگزار کرده
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {user.meetingsOrganized}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <DocumentCheckIcon className="h-10 w-10 text-purple-500" />
            <div className="mr-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                وظایف تکمیل شده
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {user.completedTasks}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <ChartBarIcon className="h-10 w-10 text-yellow-500" />
            <div className="mr-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                نرخ مشارکت
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                85%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            فعالیت‌های اخیر
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="meetings"
                  name="جلسات"
                  stroke="#8884d8"
                />
                <Line
                  type="monotone"
                  dataKey="tasks"
                  name="وظایف"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            تکمیل وظایف
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="درصد" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            مهارت‌ها
          </h2>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            فعالیت‌های اخیر
          </h2>
          <div className="space-y-4">
            {user.recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start justify-between border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {activity.title}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {activity.date}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium
                    ${
                      activity.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}
                >
                  {activity.status === 'completed' ? 'تکمیل شده' : 'در حال انجام'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;