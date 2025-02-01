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
import { motion } from 'framer-motion';
import { ChartBarIcon, ChartPieIcon } from '@heroicons/react/24/outline';

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

const ChartCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({
  title,
  icon,
  children
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg
    border border-gray-200/30 dark:border-gray-700/30 relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 to-blue-500/50" />
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10">
          {icon}
        </div>
        <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {title}
        </h3>
      </div>
      {children}
    </div>
  </motion.div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg
        border border-gray-200/30 dark:border-gray-700/30">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const gradientColors = {
  purple: ['#C084FC', '#7C3AED'],
  green: ['#4ADE80', '#16A34A'],
  orange: ['#FB923C', '#EA580C']
};

const AdvancedCharts: React.FC<AdvancedChartsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Meeting Efficiency Chart */}
      <ChartCard 
        title="تحلیل کارایی جلسات"
        icon={<ChartBarIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data.meetingEfficiency}>
              <defs>
                <linearGradient id="gradientPlanned" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={gradientColors.purple[0]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={gradientColors.purple[1]} stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="gradientActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={gradientColors.green[0]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={gradientColors.green[1]} stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                stroke="#94A3B8"
                tick={{ fill: '#94A3B8' }}
              />
              <YAxis 
                yAxisId="left" 
                stroke="#94A3B8"
                tick={{ fill: '#94A3B8' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#94A3B8"
                tick={{ fill: '#94A3B8' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="plannedDuration"
                name="زمان برنامه‌ریزی شده"
                fill="url(#gradientPlanned)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                yAxisId="left"
                dataKey="actualDuration"
                name="زمان واقعی"
                fill="url(#gradientActual)"
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="completedTasks"
                name="مصوبات تکمیل شده"
                stroke={gradientColors.orange[0]}
                strokeWidth={2}
                dot={{ fill: gradientColors.orange[1], strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Participation Metrics Radar Chart */}
      <ChartCard 
        title="معیارهای مشارکت"
        icon={<ChartPieIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.participationMetrics}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis 
                dataKey="subject"
                tick={{ fill: '#94A3B8' }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]}
                tick={{ fill: '#94A3B8' }}
              />
              <Radar
                name="عملکرد تیم A"
                dataKey="A"
                stroke={gradientColors.purple[1]}
                fill={gradientColors.purple[0]}
                fillOpacity={0.5}
              />
              <Radar
                name="عملکرد تیم B"
                dataKey="B"
                stroke={gradientColors.green[1]}
                fill={gradientColors.green[0]}
                fillOpacity={0.5}
              />
              <Legend 
                formatter={(value) => <span className="text-gray-700 dark:text-gray-300">{value}</span>}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default AdvancedCharts;