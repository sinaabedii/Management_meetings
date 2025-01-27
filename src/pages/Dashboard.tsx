import { CalendarIcon, ClockIcon, UserGroupIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const stats = [
  { name: 'جلسات امروز', value: '3', icon: CalendarIcon },
  { name: 'جلسات در انتظار', value: '12', icon: ClockIcon },
  { name: 'کل شرکت‌کنندگان', value: '45', icon: UserGroupIcon },
  { name: 'مصوبات انجام شده', value: '85%', icon: CheckCircleIcon },
];

const Dashboard = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">داشبورد</h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          خلاصه وضعیت جلسات و فعالیت‌ها
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative bg-white dark:bg-gray-800 pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-primary-500 rounded-md p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="mr-16 text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                {item.name}
              </p>
            </dt>
            <dd className="mr-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {item.value}
              </p>
            </dd>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;