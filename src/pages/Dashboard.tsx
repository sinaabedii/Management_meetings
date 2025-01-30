import  { useEffect, useRef } from 'react';
import { CalendarIcon, ClockIcon, UserGroupIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip
} from 'recharts';
import { Card } from '../components/ui/card';

const stats = [
  { name: 'جلسات امروز', value: '3', icon: CalendarIcon },
  { name: 'جلسات در انتظار', value: '12', icon: ClockIcon },
  { name: 'کل شرکت‌کنندگان', value: '45', icon: UserGroupIcon },
  { name: 'مصوبات انجام شده', value: '85%', icon: CheckCircleIcon },
];

// داده‌های نمودار دایره‌ای مصوبات
const approvalData = [
  { name: 'انجام شده', value: 85, fill: '#10B981' },
  { name: 'در حال انجام', value: 10, fill: '#F59E0B' },
  { name: 'تاخیر دار', value: 5, fill: '#EF4444' },
];

// داده‌های نمودار دایره‌ای شرکت‌کنندگان
const participantsData = [
  { name: 'مدیران', value: 30, fill: '#3B82F6' },
  { name: 'کارشناسان', value: 45, fill: '#8B5CF6' },
  { name: 'مشتریان', value: 25, fill: '#EC4899' },
];

// داده‌های نمودار RadialBar
const meetingProgressData = [
  { name: 'جلسات هفتگی', value: 90, fill: '#10B981' },
  { name: 'جلسات ماهانه', value: 75, fill: '#3B82F6' },
  { name: 'جلسات فصلی', value: 60, fill: '#8B5CF6' },
];

const todayMeetings = [
  { time: '10:00', title: 'جلسه بررسی پروژه', participants: 5, department: 'فنی' },
  { time: '14:30', title: 'هماهنگی تیم فنی', participants: 8, department: 'توسعه' },
  { time: '16:00', title: 'جلسه با مشتری', participants: 4, department: 'فروش' },
];

const Dashboard = () => {
  const lottieContainerRef = useRef(null);

  useEffect(() => {
    if (lottieContainerRef.current) {
      // lottie.loadAnimation({...})
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Welcome Banner with WebM Video */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                به سیستم مدیریت جلسات خوش آمدید
              </h1>
              <p className="text-lg text-blue-100">
                مدیریت هوشمند جلسات و پیگیری مصوبات
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 rounded-lg overflow-hidden bg-white/10">
                <video 
                  className="w-full h-full object-cover"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source 
                    src="..//Animation-dashboard.webm" 
                    type="video/webm" 
                  />
                  متاسفانه مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((item) => (
            <Card key={item.name} className="relative pt-5 px-4 pb-12 sm:pt-6 dark:bg-gray-800">
              <dt>
                <div className="absolute bg-blue-500 rounded-md p-3">
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
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* نمودار دایره‌ای مصوبات */}
          <Card className="p-4 sm:p-6 dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4">وضعیت مصوبات</h2>
            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={approvalData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {approvalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* نمودار دایره‌ای شرکت‌کنندگان */}
          <Card className="p-4 sm:p-6 dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4">ترکیب شرکت‌کنندگان</h2>
            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={participantsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {participantsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* نمودار RadialBar پیشرفت جلسات */}
          <Card className="p-4 sm:p-6 dark:bg-gray-800 lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">پیشرفت جلسات</h2>
            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="20%" 
                  outerRadius="90%" 
                  data={meetingProgressData}
                  startAngle={180} 
                  endAngle={0}
                >
                  <RadialBar
                    minAngle={15}
                    background
                    clockWise={true}
                    dataKey="value"
                  />
                  <Legend />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Today's Meetings */}
        <Card className="p-4 sm:p-6 dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-4">جلسات امروز</h2>
          <div className="space-y-4">
            {todayMeetings.map((meeting) => (
              <div key={meeting.time} 
                   className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="mb-2 sm:mb-0">
                  <p className="font-medium">{meeting.title}</p>
                  <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
                    <span className="flex items-center">
                      <ClockIcon className="h-4 w-4 ml-1" />
                      {meeting.time}
                    </span>
                    <span className="flex items-center">
                      <UserGroupIcon className="h-4 w-4 ml-1" />
                      {meeting.participants} نفر
                    </span>
                  </div>
                </div>
                <div className="flex items-center mt-2 sm:mt-0">
                  <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {meeting.department}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;