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

interface ComparisonChartsProps {
  data: {
    meetingDistribution: any[];
    timeEfficiency: any[];
    processFlow: any[];
    taskCompletion: any[];
  };
}

const ComparisonCharts: React.FC<ComparisonChartsProps> = ({ data }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Time vs Efficiency Scatter Plot */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            تحلیل زمان و بهره‌وری
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid />
                <XAxis type="number" dataKey="duration" name="مدت جلسه" unit="دقیقه" />
                <YAxis type="number" dataKey="efficiency" name="بهره‌وری" unit="%" />
                <ZAxis type="number" dataKey="size" range={[100, 500]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="جلسات" data={data.timeEfficiency} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Process Flow Sankey */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            جریان فرآیندها
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <Sankey
                data={data.processFlow}
                nodePadding={50}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                link={{ stroke: '#999' }}
              />
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution TreeMap */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            توزیع موضوعی جلسات
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <TreeMap
                data={data.meetingDistribution}
                dataKey="size"
                aspectRatio={4 / 3}
                stroke="#fff"
                fill="#8884d8"
              >
                <Tooltip />
              </TreeMap>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Completion Funnel */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            قیف تکمیل وظایف
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip />
                <Funnel
                  dataKey="value"
                  data={data.taskCompletion}
                  isAnimationActive
                >
                  <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonCharts;