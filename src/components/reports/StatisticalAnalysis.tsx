import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  Area
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChartBarIcon,
  PresentationChartLineIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/outline";

interface StatisticalAnalysisProps {
  // ... (interfaces remain the same)
}

const ChartCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}> = ({ title, icon, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6
    border border-gray-200/30 dark:border-gray-700/30 relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 to-blue-500/50" />
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10">
        {icon}
      </div>
      <h4 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        {title}
      </h4>
    </div>
    {children}
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

const MetricSelector = ({ value, onChange }) => (
  <motion.div className="relative">
    <select
      className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 
      backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30
      focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300
      text-gray-700 dark:text-gray-300 appearance-none pr-10"
      value={value}
      onChange={onChange}
    >
      <option value="duration">مدت جلسات</option>
      <option value="attendance">حضور و غیاب</option>
      <option value="completion">نرخ تکمیل</option>
    </select>
    <ChartBarIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400 pointer-events-none" />
  </motion.div>
);

const StatisticalAnalysis: React.FC<StatisticalAnalysisProps> = ({ data }) => {
  const [selectedMetric, setSelectedMetric] = useState("duration");

  const gradientColors = {
    actual: ['#C084FC', '#7C3AED'],
    prediction: ['#60A5FA', '#3B82F6'],
    bounds: ['#FB923C', '#EA580C']
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6
        border border-gray-200/30 dark:border-gray-700/30 relative overflow-hidden mb-8"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 to-blue-500/50" />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10">
              <PresentationChartLineIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              تحلیل‌های آماری پیشرفته
            </h3>
          </div>
          <div className="w-48">
            <MetricSelector
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            />
          </div>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trend Analysis */}
        <ChartCard
          title="تحلیل روند و پیش‌بینی"
          icon={<ArrowTrendingUpIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
          delay={0.2}
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.trends}>
                <defs>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={gradientColors.actual[0]} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={gradientColors.actual[1]} stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={gradientColors.prediction[0]} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={gradientColors.prediction[1]} stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="date" 
                  stroke="#94A3B8"
                  tick={{ fill: '#94A3B8' }}
                />
                <YAxis 
                  stroke="#94A3B8"
                  tick={{ fill: '#94A3B8' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={gradientColors.actual[0]}
                  fill="url(#actualGradient)"
                  name="مقدار واقعی"
                />
                <Line
                  type="monotone"
                  dataKey="prediction"
                  stroke={gradientColors.prediction[0]}
                  strokeWidth={2}
                  dot={{ fill: gradientColors.prediction[1] }}
                  name="پیش‌بینی"
                />
                <Line
                  type="monotone"
                  dataKey="upperBound"
                  stroke={gradientColors.bounds[0]}
                  strokeDasharray="3 3"
                  name="حد بالا"
                />
                <Line
                  type="monotone"
                  dataKey="lowerBound"
                  stroke={gradientColors.bounds[0]}
                  strokeDasharray="3 3"
                  name="حد پایین"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Correlation Analysis */}
        <ChartCard
          title="تحلیل همبستگی"
          icon={<ChartBarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
          delay={0.4}
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <defs>
                  <linearGradient id="scatterGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={gradientColors.actual[0]} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={gradientColors.actual[1]} stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#E5E7EB" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="متغیر X"
                  stroke="#94A3B8"
                  tick={{ fill: '#94A3B8' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="متغیر Y"
                  stroke="#94A3B8"
                  tick={{ fill: '#94A3B8' }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />
                <Legend />
                <Scatter
                  name="همبستگی"
                  data={data.correlations}
                  fill="url(#scatterGradient)"
                  shape="circle"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </motion.div>
  );
};

export default StatisticalAnalysis;