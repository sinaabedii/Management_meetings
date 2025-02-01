import { useEffect, useRef } from "react";
import videoSource from "/video/aniamte.mp4";
import {
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
} from "recharts";
import { Card } from "../components/ui/card";

const stats = [
  { name: "جلسات امروز", value: "3", icon: CalendarIcon },
  { name: "جلسات در انتظار", value: "12", icon: ClockIcon },
  { name: "کل شرکت‌کنندگان", value: "45", icon: UserGroupIcon },
  { name: "مصوبات انجام شده", value: "85%", icon: CheckCircleIcon },
];

const approvalData = [
  { name: "انجام شده", value: 85, fill: "#10B981" },
  { name: "در حال انجام", value: 10, fill: "#F59E0B" },
  { name: "تاخیر دار", value: 5, fill: "#EF4444" },
];

const participantsData = [
  { name: "مدیران", value: 30, fill: "#3B82F6" },
  { name: "کارشناسان", value: 45, fill: "#8B5CF6" },
  { name: "مشتریان", value: 25, fill: "#EC4899" },
];

const meetingProgressData = [
  { name: "جلسات هفتگی", value: 90, fill: "#10B981" },
  { name: "جلسات ماهانه", value: 75, fill: "#3B82F6" },
  { name: "جلسات فصلی", value: 60, fill: "#8B5CF6" },
];

const todayMeetings = [
  {
    time: "10:00",
    title: "جلسه بررسی پروژه",
    participants: 5,
    department: "فنی",
  },
  {
    time: "14:30",
    title: "هماهنگی تیم فنی",
    participants: 8,
    department: "توسعه",
  },
  {
    time: "16:00",
    title: "جلسه با مشتری",
    participants: 4,
    department: "فروش",
  },
];

const Dashboard = () => {
  const lottieContainerRef = useRef(null);

  useEffect(() => {
    if (lottieContainerRef.current) {
    }
  }, []);

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white overflow-hidden rounded-xl">
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4 sm:px-6 lg:px-8 py-12">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                به سیستم مدیریت جلسات خوش آمدید
              </h1>
              <p className="text-lg text-blue-100">
                مدیریت هوشمند جلسات و پیگیری مصوبات
              </p>
            </div>
          </div>
          <div className="flex justify-center lg:w-1/3 ">
            <div className="w-full max-w-[400px] h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden bg-white/10">
              <video
                className="w-full h-full object-cover p-0"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={videoSource} type="video/mp4" />
                متاسفانه مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
              </video>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {stats.map((item, index) => (
            <Card
              key={item.name}
              className={`relative overflow-hidden p-4 sm:p-6 md:p-8 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg dark:bg-gray-800/60 backdrop-blur-lg border-none
        ${
          index % 4 === 0 &&
          "rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-600/10"
        }
        ${
          index % 4 === 1 &&
          "rounded-[2rem_0.5rem_2rem_0.5rem] bg-gradient-to-tl from-purple-500/10 to-pink-600/10"
        }
        ${
          index % 4 === 2 &&
          "rounded-[0.5rem_2rem_0.5rem_2rem] bg-gradient-to-tr from-indigo-500/10 to-blue-600/10"
        }
        ${
          index % 4 === 3 &&
          "rounded-[3rem_0.5rem_0.5rem_2rem] bg-gradient-to-bl from-pink-500/10 to-rose-600/10"
        }
      `}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`
          p-3 transform transition-transform duration-300 hover:scale-110
          ${
            index % 4 === 0 &&
            "rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600"
          }
          ${
            index % 4 === 1 &&
            "rounded-[1rem_0.25rem_1rem_0.25rem] bg-gradient-to-tl from-purple-500 to-pink-600"
          }
          ${
            index % 4 === 2 &&
            "rounded-[0.25rem_1rem_0.25rem_1rem] bg-gradient-to-tr from-indigo-500 to-blue-600"
          }
          ${
            index % 4 === 3 &&
            "rounded-[1.5rem_0.25rem_0.25rem_1rem] bg-gradient-to-bl from-pink-500 to-rose-600"
          }
        `}
                >
                  <item.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <span
                  className={`text-3xl font-bold bg-clip-text text-transparent
          ${index % 4 === 0 && "bg-gradient-to-br from-blue-600 to-purple-600"}
          ${index % 4 === 1 && "bg-gradient-to-tl from-purple-600 to-pink-600"}
          ${index % 4 === 2 && "bg-gradient-to-tr from-indigo-600 to-blue-600"}
          ${index % 4 === 3 && "bg-gradient-to-bl from-pink-600 to-rose-600"}
        `}
                >
                  {item.value}
                </span>
              </div>

              <h3 className="text-base font-semibold text-gray-600 dark:text-gray-300">
                {item.name}
              </h3>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <Card className="p-4 sm:p-6 md:p-8 rounded-[2rem_0.5rem_2rem_0.5rem] dark:bg-gray-800/60 backdrop-blur-lg">
            <h2 className="text-base sm:text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              وضعیت مصوبات
            </h2>
            <div className="h-48 sm:h-56 md:h-64 lg:h-72">
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
          <Card className="p-6 rounded-[0.5rem_2rem_0.5rem_2rem] dark:bg-gray-800/60 backdrop-blur-lg">
            <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ترکیب شرکت‌کنندگان
            </h2>
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
          <Card className="p-6 rounded-[3rem_0.5rem_0.5rem_2rem] dark:bg-gray-800/60 backdrop-blur-lg">
            <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              پیشرفت جلسات
            </h2>
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
        <Card className="p-4 sm:p-6 md:p-8 rounded-[2rem_1rem] dark:bg-gray-800/60 backdrop-blur-lg">
          <h2 className="text-base sm:text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            جلسات امروز
          </h2>
          <div className="space-y-2 sm:space-y-4">
            {todayMeetings.map((meeting, index) => (
              <div
                key={meeting.time}
                className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 backdrop-blur-lg rounded-xl transition-all duration-300 hover:translate-x-2
                  ${
                    index % 2 === 0
                      ? "bg-blue-50/50 dark:bg-blue-900/20"
                      : "bg-purple-50/50 dark:bg-purple-900/20"
                  }
                `}
              >
                <div className="mb-2 sm:mb-0">
                  <p className="text-sm sm:text-base font-medium">
                    {meeting.title}
                  </p>
                  <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 gap-1 sm:gap-2">
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
                  <span className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
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
