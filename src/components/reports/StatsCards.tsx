import React from 'react';
import {
  CalendarIcon,
  UsersIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { MeetingMetrics } from '../../types/report';

interface StatsCardsProps {
  metrics: MeetingMetrics;
}

const StatsCards: React.FC<StatsCardsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
            <CalendarIcon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div className="mr-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">کل جلسات</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {metrics.totalMeetings}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
            <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
          <div className="mr-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">جلسات برگزار شده</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {metrics.completedMeetings}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
            <UsersIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
          </div>
          <div className="mr-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">میانگین شرکت‌کنندگان</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {metrics.averageParticipants}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
            <ClockIcon className="h-6 w-6 text-purple-600 dark:text-purple-300" />
          </div>
          <div className="mr-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">میانگین مدت جلسات</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {metrics.averageDuration} دقیقه
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;