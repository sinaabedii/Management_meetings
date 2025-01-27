import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface AdvancedChartsProps {
  data: {
    meetingEfficiency: Array<{
      month: string;
      plannedDuration: number;
      actualDuration: number;
      completedTasks: number;
    }>;
    participationMetrics: Array<{
      subject: string;
      A: number;
      B: number;
      fullMark: number;
    }>;
  };
}

const AdvancedCharts: React.FC<AdvancedChartsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Meeting Efficiency Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          تحلیل کارایی جلسات
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data.meetingEfficiency}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="plannedDuration"
                name="زمان برنامه‌ریزی شده"
                fill="#8884d8"
              />
              <Bar
                yAxisId="left"
                dataKey="actualDuration"
                name="زمان واقعی"
                fill="#82ca9d"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="completedTasks"
                name="مصوبات تکمیل شده"
                stroke="#ff7300"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Participation Metrics Radar Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          معیارهای مشارکت
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.participationMetrics}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="عملکرد تیم A"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Radar
                name="عملکرد تیم B"
                dataKey="B"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCharts;