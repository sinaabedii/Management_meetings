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
} from "recharts";

interface StatisticalAnalysisProps {
  data: {
    trends: Array<{
      date: string;
      value: number;
      prediction: number;
      upperBound: number;
      lowerBound: number;
    }>;
    correlations: Array<{
      x: number;
      y: number;
      name: string;
    }>;
    distribution: Array<{
      x: string;
      y: number;
    }>;
    comparisonData?: Array<{
      category: string;
      current: number;
      previous: number;
    }>;
  };
}

const StatisticalAnalysis: React.FC<StatisticalAnalysisProps> = ({ data }) => {
  const [selectedMetric, setSelectedMetric] = useState("duration");

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            تحلیل‌های آماری پیشرفته
          </h3>
          <select
            className="input-primary"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
          >
            <option value="duration">مدت جلسات</option>
            <option value="attendance">حضور و غیاب</option>
            <option value="completion">نرخ تکمیل</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
              تحلیل روند و پیش‌بینی
            </h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    name="مقدار واقعی"
                  />
                  <Line
                    type="monotone"
                    dataKey="prediction"
                    stroke="#82ca9d"
                    strokeDasharray="5 5"
                    name="پیش‌بینی"
                  />
                  <Line
                    type="monotone"
                    dataKey="upperBound"
                    stroke="#ff7300"
                    strokeDasharray="3 3"
                    name="حد بالا"
                  />
                  <Line
                    type="monotone"
                    dataKey="lowerBound"
                    stroke="#ff7300"
                    strokeDasharray="3 3"
                    name="حد پایین"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
              تحلیل همبستگی
            </h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="x" name="متغیر X" />
                  <YAxis type="number" dataKey="y" name="متغیر Y" />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Legend />
                  <Scatter
                    name="همبستگی"
                    data={data.correlations}
                    fill="#8884d8"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticalAnalysis;
