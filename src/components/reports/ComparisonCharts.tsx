import React from 'react';
import {
  ResponsiveContainer,
  TreeMap,
  Scatter,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  Sankey,
  Funnel,
  FunnelChart,
  LabelList
} from 'recharts';
import { motion } from 'framer-motion';
import {
  ClockIcon,
  ArrowPathIcon,
  ChartBarIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

interface ComparisonChartsProps {
  data: {
    meetingDistribution: any[];
    timeEfficiency: any[];
    processFlow: any[];
    taskCompletion: any[];
  };
}

const ChartCard: React.FC<{ 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
  delay?: number;
}> = ({
  title,
  icon,
  children,
  delay = 0
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
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
        {label && <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>}
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
  blue: ['#60A5FA', '#3B82F6'],
  green: ['#4ADE80', '#16A34A'],
  orange: ['#FB923C', '#EA580C'],
  colors: ['#C084FC', '#60A5FA', '#4ADE80', '#FB923C', '#F472B6']
};

const ComparisonCharts: React.FC<ComparisonChartsProps> = ({ data }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Time vs Efficiency Scatter Plot */}
        <ChartCard 
          title="تحلیل زمان و بهره‌وری"
          icon={<ClockIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
          delay={0}
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <defs>
                  <linearGradient id="scatterGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={gradientColors.purple[0]} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={gradientColors.purple[1]} stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  type="number" 
                  dataKey="duration" 
                  name="مدت جلسه" 
                  unit="دقیقه"
                  stroke="#94A3B8"
                  tick={{ fill: '#94A3B8' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="efficiency" 
                  name="بهره‌وری" 
                  unit="%"
                  stroke="#94A3B8"
                  tick={{ fill: '#94A3B8' }}
                />
                <ZAxis type="number" dataKey="size" range={[100, 500]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Scatter 
                  name="جلسات" 
                  data={data.timeEfficiency} 
                  fill="url(#scatterGradient)"
                  shape="circle"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Process Flow Sankey */}
        <ChartCard 
          title="جریان فرآیندها"
          icon={<ArrowPathIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
          delay={0.2}
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <Sankey
                data={data.processFlow}
                nodePadding={50}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                link={{ 
                  stroke: '#E5E7EB',
                  strokeOpacity: 0.5,
                  strokeWidth: 2,
                  fill: 'none'
                }}
                node={{
                  fill: gradientColors.blue[0],
                  stroke: gradientColors.blue[1],
                  strokeWidth: 1
                }}
              >
                <Tooltip content={<CustomTooltip />} />
              </Sankey>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Distribution TreeMap */}
        <ChartCard 
          title="توزیع موضوعی جلسات"
          icon={<ChartBarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />}
          delay={0.4}
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <TreeMap
                data={data.meetingDistribution}
                dataKey="size"
                aspectRatio={4 / 3}
                stroke="#fff"
                content={({ depth, x, y, width, height, name, value }) => (
                  <g>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      style={{
                        fill: gradientColors.colors[depth % gradientColors.colors.length],
                        stroke: '#fff',
                        strokeWidth: 2,
                        strokeOpacity: 1 / (depth + 1),
                      }}
                    />
                    {width > 50 && height > 30 && (
                      <text
                        x={x + width / 2}
                        y={y + height / 2}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize={12}
                      >
                        {name}
                      </text>
                    )}
                  </g>
                )}
              >
                <Tooltip content={<CustomTooltip />} />
              </TreeMap>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Task Completion Funnel */}
        <ChartCard 
          title="قیف تکمیل وظایف"
          icon={<FunnelIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />}
          delay={0.6}
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <defs>
                  <linearGradient id="funnelGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={gradientColors.orange[0]} />
                    <stop offset="100%" stopColor={gradientColors.orange[1]} />
                  </linearGradient>
                </defs>
                <Tooltip content={<CustomTooltip />} />
                <Funnel
                  dataKey="value"
                  data={data.taskCompletion}
                  isAnimationActive
                  fill="url(#funnelGradient)"
                >
                  <LabelList 
                    position="right" 
                    fill="#94A3B8"
                    stroke="none" 
                    dataKey="name"
                    fontSize={12}
                  />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default ComparisonCharts;