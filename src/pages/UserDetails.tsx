import { useParams, useNavigate } from 'react-router-dom';
import {
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ClockIcon,
  DocumentCheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface StatCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: number;
  color: string;
}

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


const StatCard : React.FC<StatCardProps> = ({ icon: Icon, title, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6
    border border-gray-200/30 dark:border-gray-700/30 relative overflow-hidden
    hover:shadow-xl transition-all duration-300"
  >
    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color}`} />
    <div className="flex items-center">
      <div className={`p-3 rounded-xl bg-gradient-to-br ${color} bg-opacity-10`}>
        <Icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
      </div>
      <div className="mr-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {title}
        </p>
        <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {value}
        </p>
      </div>
    </div>
  </motion.div>
);

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = MOCK_USER;

  return (
    <div className="container mx-auto px-4 ">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/users')}
        className="mb-6 flex items-center text-gray-600 hover:text-purple-600 dark:text-gray-400 
        dark:hover:text-purple-400 transition-colors duration-300"
      >
        <ArrowRightIcon className="h-5 w-5 ml-2" />
        بازگشت به لیست کاربران
      </motion.button>

      {/* اطلاعات اصلی کاربر */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6
        border border-gray-200/30 dark:border-gray-700/30 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 to-blue-500/50" />
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-24 w-24 rounded-full ring-4 ring-purple-500/20"
            />
            <div className="mr-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {user.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {user.role}
              </p>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                ${
                  user.status === 'active'
                    ? 'bg-green-100/80 text-green-800 dark:bg-green-900/80 dark:text-green-300'
                    : 'bg-red-100/80 text-red-800 dark:bg-red-900/80 dark:text-red-300'
                }`}
              >
                {user.status === 'active' ? 'فعال' : 'غیرفعال'}
              </motion.span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/users/${id}/edit`)}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl
            shadow-lg shadow-purple-500/30 hover:shadow-blue-500/40 transition-all duration-300"
          >
            ویرایش پروفایل
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center p-3 rounded-xl bg-purple-50/50 dark:bg-purple-900/20"
          >
            <EnvelopeIcon className="h-5 w-5 text-purple-500 ml-2" />
            <span className="text-gray-600 dark:text-gray-300">{user.email}</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center p-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/20"
          >
            <PhoneIcon className="h-5 w-5 text-blue-500 ml-2" />
            <span className="text-gray-600 dark:text-gray-300">{user.phone}</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center p-3 rounded-xl bg-purple-50/50 dark:bg-purple-900/20"
          >
            <BuildingOfficeIcon className="h-5 w-5 text-purple-500 ml-2" />
            <span className="text-gray-600 dark:text-gray-300">{user.department}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* آمار کاربر */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          icon={CalendarIcon}
          title="جلسات شرکت کرده"
          value={user.meetingsAttended}
          color="from-purple-500/50 to-blue-500/50"
        />
        <StatCard
          icon={ClockIcon}
          title="جلسات برگزار کرده"
          value={user.meetingsOrganized}
          color="from-blue-500/50 to-green-500/50"
        />
        <StatCard
          icon={DocumentCheckIcon}
          title="مصوبات تکمیل شده"
          value={user.completedTasks}
          color="from-green-500/50 to-teal-500/50"
        />
      </div>

      {/* جلسات اخیر و فعالیت‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* جلسات اخیر */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6
          border border-gray-200/30 dark:border-gray-700/30 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 to-blue-500/50" />
          <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            جلسات اخیر
          </h2>
          <div className="space-y-4">
            {user.recentMeetings.map((meeting) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={meeting.id}
                className="flex items-center justify-between border-b border-gray-200/30 dark:border-gray-700/30 pb-4"
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
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    meeting.status === 'completed'
                      ? 'bg-green-100/80 text-green-800 dark:bg-green-900/80 dark:text-green-300'
                      : 'bg-blue-100/80 text-blue-800 dark:bg-blue-900/80 dark:text-blue-300'
                  }`}
                >
                  {meeting.status === 'completed' ? 'برگزار شده' : 'برنامه‌ریزی شده'}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* فعالیت‌های اخیر */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6
          border border-gray-200/30 dark:border-gray-700/30 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/50 to-purple-500/50" />
          <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            فعالیت‌های اخیر
          </h2>
          <div className="space-y-4">
            {user.recentActivities.map((activity, index) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={index}
                className="flex items-start border-b border-gray-200/30 dark:border-gray-700/30 pb-4"
              >
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">
                    {activity.description}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDetails;