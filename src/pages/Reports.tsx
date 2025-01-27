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
import { format, subMonths } from "date-fns-jalali";
import StatsCards from "../components/reports/StatsCards";
import ReportFilters from "../components/reports/ReportFilters";
import {
  MeetingStats,
  DepartmentMeeting,
  AttendanceData,
  DateRangeType,
  DepartmentType,
  MeetingMetrics,
} from "../types/report";
import AdvancedFilters, {
  AdvancedFilterState,
} from "../components/reports/AdvancedFilters";
import AdvancedCharts from "../components/reports/AdvancedCharts";
import StatisticalAnalysis from "../components/reports/StatisticalAnalysis";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

// Mock data generator functions
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
    { date: 'فروردین', value: 65, prediction: 68, upperBound: 75, lowerBound: 61 },
    { date: 'اردیبهشت', value: 68, prediction: 70, upperBound: 77, lowerBound: 63 },
    { date: 'خرداد', value: 72, prediction: 73, upperBound: 80, lowerBound: 66 },
    { date: 'تیر', value: 75, prediction: 76, upperBound: 83, lowerBound: 69 },
    { date: 'مرداد', value: 78, prediction: 79, upperBound: 86, lowerBound: 72 },
    { date: 'شهریور', value: 82, prediction: 82, upperBound: 89, lowerBound: 75 }
  ] as Array<{ date: string; value: number; prediction: number; upperBound: number; lowerBound: number }>,
  
  correlations: [
    { x: 30, y: 40, name: 'A' },
    { x: 50, y: 55, name: 'B' },
    { x: 70, y: 65, name: 'C' },
    { x: 90, y: 85, name: 'D' },
    { x: 110, y: 95, name: 'E' }
  ] as Array<{ x: number; y: number; name: string }>,
  
  distribution: [
    { x: '0-30', y: 10 },
    { x: '31-60', y: 25 },
    { x: '61-90', y: 35 },
    { x: '91-120', y: 20 },
    { x: '120+', y: 10 }
  ] as Array<{ x: string; y: number }>,
  
  boxPlotData: [
    {
      category: 'جلسات کوتاه',
      min: 15,
      q1: 25,
      median: 30,
      q3: 35,
      max: 45
    },
    {
      category: 'جلسات متوسط',
      min: 45,
      q1: 55,
      median: 60,
      q3: 65,
      max: 75
    },
    {
      category: 'جلسات طولانی',
      min: 75,
      q1: 85,
      median: 90,
      q3: 95,
      max: 120
    }
  ] as Array<{ category: string; min: number; q1: number; median: number; q3: number; max: number }>
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

  const metrics: MeetingMetrics = {
    totalMeetings: 145,
    completedMeetings: 128,
    averageParticipants: 8.5,
    averageDuration: 75,
  };

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
      // در اینجا می‌توانید داده‌ها را بر اساس دپارتمان فیلتر کنید
    },
    []
  );

  return (
    <div className="container mx-auto px-4 py-8">
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

        <StatsCards metrics={metrics} />
        <AdvancedFilters
          onFilterChange={(filters: AdvancedFilterState) => {
            console.log("Advanced filters changed:", filters);
            // اینجا می‌توانید فیلترها را اعمال کنید
          }}
        />

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            تحلیل‌های پیشرفته
          </h3>
          <AdvancedCharts data={advancedChartsData} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Meetings Bar Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              روند جلسات ماهانه
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={meetingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" name="کل جلسات" fill="#0088FE" />
                  <Bar dataKey="completed" name="برگزار شده" fill="#00C49F" />
                  <Bar dataKey="cancelled" name="لغو شده" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Distribution Pie Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              توزیع جلسات بر اساس دپارتمان
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentMeetings}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentMeetings.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Attendance Line Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              نرخ حضور و غیاب
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="present"
                    name="حاضر"
                    stroke="#00C49F"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="absent"
                    name="غایب"
                    stroke="#FF8042"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            تحلیل‌های آماری پیشرفته
          </h3>
          <StatisticalAnalysis data={data} />
        </div>
      </div>
    </div>
  );
};

export default Reports;
