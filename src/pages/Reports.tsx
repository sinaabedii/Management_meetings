import { useState, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { format, subMonths } from "date-fns-jalali";
import ReportFilters from "../components/reports/ReportFilters";
import {
  MeetingStats,
  DepartmentMeeting,
  AttendanceData,
  DateRangeType,
  DepartmentType,
  MeetingMetrics,
} from "../types/report";
import AdvancedFilters from "../components/reports/AdvancedFilters";
import AdvancedCharts from "../components/reports/AdvancedCharts";
import StatisticalAnalysis from "../components/reports/StatisticalAnalysis";
import { ChartBarIcon, ChartPieIcon } from "lucide-react";

type GradientColors = {
  [key: string]: [string, string];
};

const gradientColors: GradientColors = {
  blue: ["#60A5FA", "#3B82F6"],
  green: ["#4ADE80", "#16A34A"],
  orange: ["#FB923C", "#EA580C"],
  purple: ["#C084FC", "#7C3AED"],
};
const generateMeetingsData = (months: number): MeetingStats[] => {
  return Array.from({ length: months }, (_, i) => ({
    month: format(subMonths(new Date(), i), "MMMM"),
    total: Math.floor(Math.random() * 30) + 10,
    completed: Math.floor(Math.random() * 20) + 5,
    cancelled: Math.floor(Math.random() * 5),
  })).reverse();
};

const departmentMeetings: DepartmentMeeting[] = [
  { name: "مدیریت پروژه", value: 30 },
  { name: "توسعه", value: 45 },
  { name: "طراحی", value: 25 },
  { name: "مارکتینگ", value: 20 },
  { name: "منابع انسانی", value: 15 },
];
const advancedChartsData = {
  meetingEfficiency: [
    {
      month: "فروردین",
      plannedDuration: 100,
      actualDuration: 120,
      completedTasks: 15,
    },
    {
      month: "اردیبهشت",
      plannedDuration: 120,
      actualDuration: 125,
      completedTasks: 20,
    },
    {
      month: "خرداد",
      plannedDuration: 130,
      actualDuration: 110,
      completedTasks: 25,
    },
    {
      month: "تیر",
      plannedDuration: 140,
      actualDuration: 130,
      completedTasks: 22,
    },
    {
      month: "مرداد",
      plannedDuration: 150,
      actualDuration: 140,
      completedTasks: 28,
    },
    {
      month: "شهریور",
      plannedDuration: 160,
      actualDuration: 145,
      completedTasks: 30,
    },
  ],
  participationMetrics: [
    {
      subject: "مشارکت در بحث",
      A: 90,
      B: 80,
      fullMark: 100,
    },
    {
      subject: "حضور به موقع",
      A: 85,
      B: 95,
      fullMark: 100,
    },
    {
      subject: "تکمیل وظایف",
      A: 75,
      B: 85,
      fullMark: 100,
    },
    {
      subject: "ارائه بازخورد",
      A: 80,
      B: 70,
      fullMark: 100,
    },
    {
      subject: "همکاری تیمی",
      A: 95,
      B: 90,
      fullMark: 100,
    },
  ],
};

const data = {
  trends: [
    {
      date: "فروردین",
      value: 65,
      prediction: 68,
      upperBound: 75,
      lowerBound: 61,
    },
    {
      date: "اردیبهشت",
      value: 68,
      prediction: 70,
      upperBound: 77,
      lowerBound: 63,
    },
    {
      date: "خرداد",
      value: 72,
      prediction: 73,
      upperBound: 80,
      lowerBound: 66,
    },
    { date: "تیر", value: 75, prediction: 76, upperBound: 83, lowerBound: 69 },
    {
      date: "مرداد",
      value: 78,
      prediction: 79,
      upperBound: 86,
      lowerBound: 72,
    },
    {
      date: "شهریور",
      value: 82,
      prediction: 82,
      upperBound: 89,
      lowerBound: 75,
    },
  ] as Array<{
    date: string;
    value: number;
    prediction: number;
    upperBound: number;
    lowerBound: number;
  }>,

  correlations: [
    { x: 30, y: 40, name: "A" },
    { x: 50, y: 55, name: "B" },
    { x: 70, y: 65, name: "C" },
    { x: 90, y: 85, name: "D" },
    { x: 110, y: 95, name: "E" },
  ] as Array<{ x: number; y: number; name: string }>,

  distribution: [
    { x: "0-30", y: 10 },
    { x: "31-60", y: 25 },
    { x: "61-90", y: 35 },
    { x: "91-120", y: 20 },
    { x: "120+", y: 10 },
  ] as Array<{ x: string; y: number }>,

  boxPlotData: [
    {
      category: "جلسات کوتاه",
      min: 15,
      q1: 25,
      median: 30,
      q3: 35,
      max: 45,
    },
    {
      category: "جلسات متوسط",
      min: 45,
      q1: 55,
      median: 60,
      q3: 65,
      max: 75,
    },
    {
      category: "جلسات طولانی",
      min: 75,
      q1: 85,
      median: 90,
      q3: 95,
      max: 120,
    },
  ] as Array<{
    category: string;
    min: number;
    q1: number;
    median: number;
    q3: number;
    max: number;
  }>,
};

const generateAttendanceData = (months: number): AttendanceData[] => {
  return Array.from({ length: months }, (_, i) => ({
    name: format(subMonths(new Date(), i), "MMMM"),
    present: Math.floor(Math.random() * 15) + 85,
    absent: Math.floor(Math.random() * 15),
    total: 100,
  })).reverse();
};

const Reports = () => {
  const [dateRange, setDateRange] = useState<DateRangeType>("last6months");
  const [department, setDepartment] = useState<DepartmentType>("all");
  const [meetingsData, setMeetingsData] = useState<MeetingStats[]>(() =>
    generateMeetingsData(6)
  );
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>(() =>
    generateAttendanceData(6)
  );

  const handleDateRangeChange = useCallback((newRange: DateRangeType) => {
    setDateRange(newRange);
    const months =
      newRange === "last3months" ? 3 : newRange === "last6months" ? 6 : 12;
    setMeetingsData(generateMeetingsData(months));
    setAttendanceData(generateAttendanceData(months));
  }, []);

  const handleDepartmentChange = useCallback(
    (newDepartment: DepartmentType) => {
      setDepartment(newDepartment);
    },
    []
  );

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          گزارش‌های جلسات
        </h1>

        <ReportFilters
          dateRange={dateRange}
          department={department}
          onDateRangeChange={handleDateRangeChange}
          onDepartmentChange={handleDepartmentChange}
        />
        <AdvancedFilters
          onFilterChange={(filters: AdvancedFilterState) => {
            console.log("Advanced filters changed:", filters);
          }}
        />

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            تحلیل‌های پیشرفته
          </h3>
          <AdvancedCharts data={advancedChartsData} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg
    border border-gray-200/30 dark:border-gray-700/30 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 to-blue-500/50" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10">
                  <ChartBarIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  روند جلسات ماهانه
                </h3>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={meetingsData}>
                    <defs>
                      <linearGradient id="barTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#C084FC"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#7C3AED"
                          stopOpacity={0.3}
                        />
                      </linearGradient>
                      <linearGradient
                        id="barCompleted"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#4ADE80"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#16A34A"
                          stopOpacity={0.3}
                        />
                      </linearGradient>
                      <linearGradient
                        id="barCancelled"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#FB923C"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#EA580C"
                          stopOpacity={0.3}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="month"
                      stroke="#94A3B8"
                      tick={{ fill: "#94A3B8" }}
                    />
                    <YAxis stroke="#94A3B8" tick={{ fill: "#94A3B8" }} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div
                              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg
                      border border-gray-200/30 dark:border-gray-700/30"
                            >
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {label}
                              </p>
                              {payload.map((entry, index) => (
                                <p
                                  key={index}
                                  className="text-sm"
                                  style={{ color: entry.color }}
                                >
                                  {entry.name}: {entry.value}
                                </p>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="total"
                      name="کل جلسات"
                      fill="url(#barTotal)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="completed"
                      name="برگزار شده"
                      fill="url(#barCompleted)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="cancelled"
                      name="لغو شده"
                      fill="url(#barCancelled)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Department Distribution Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg
    border border-gray-200/30 dark:border-gray-700/30 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/50 to-purple-500/50" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                  <ChartPieIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  توزیع جلسات بر اساس دپارتمان
                </h3>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      {Object.entries(gradientColors).map(
                        ([key, colors], index) => (
                          <linearGradient
                            key={key}
                            id={`pieGradient${index}`}
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor={colors[0]}
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="100%"
                              stopColor={colors[1]}
                              stopOpacity={0.8}
                            />
                          </linearGradient>
                        )
                      )}
                    </defs>
                    <Pie
                      data={departmentMeetings}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                      outerRadius={100}
                      dataKey="value"
                      className="drop-shadow-lg"
                    >
                      {departmentMeetings.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`url(#pieGradient${index})`}
                          stroke="#fff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div
                              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg
                      border border-gray-200/30 dark:border-gray-700/30"
                            >
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {payload[0].name}
                              </p>
                              <p className="text-sm text-gray-800 dark:text-gray-200">
                                {payload[0].value} جلسه
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg
    border border-gray-200/30 dark:border-gray-700/30 relative overflow-hidden lg:col-span-2"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500/50 to-blue-500/50" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-green-500/10 to-blue-500/10">
                  <ChartBarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  نرخ حضور و غیاب
                </h3>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceData}>
                    <defs>
                      <linearGradient
                        id="linePresent"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop offset="0%" stopColor="#4ADE80" stopOpacity={1} />
                        <stop
                          offset="100%"
                          stopColor="#16A34A"
                          stopOpacity={1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="lineAbsent"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop offset="0%" stopColor="#FB923C" stopOpacity={1} />
                        <stop
                          offset="100%"
                          stopColor="#EA580C"
                          stopOpacity={1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="name"
                      stroke="#94A3B8"
                      tick={{ fill: "#94A3B8" }}
                    />
                    <YAxis stroke="#94A3B8" tick={{ fill: "#94A3B8" }} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div
                              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg
                      border border-gray-200/30 dark:border-gray-700/30"
                            >
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {label}
                              </p>
                              {payload.map((entry, index) => (
                                <p
                                  key={index}
                                  className="text-sm"
                                  style={{ color: entry.stroke }}
                                >
                                  {entry.name}: {entry.value}%
                                </p>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="present"
                      name="حاضر"
                      stroke="url(#linePresent)"
                      strokeWidth={3}
                      dot={{
                        fill: "#4ADE80",
                        strokeWidth: 2,
                        r: 5,
                        stroke: "#16A34A",
                      }}
                      activeDot={{ r: 8, strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="absent"
                      name="غایب"
                      stroke="url(#lineAbsent)"
                      strokeWidth={3}
                      dot={{
                        fill: "#FB923C",
                        strokeWidth: 2,
                        r: 5,
                        stroke: "#EA580C",
                      }}
                      activeDot={{ r: 8, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="mt-8">
          <StatisticalAnalysis data={data} />
        </div>
      </div>
    </div>
  );
};

export default Reports;
