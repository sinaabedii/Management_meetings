import React from 'react';
import { DateRangeType, DepartmentType } from '../../types/report';
import { motion } from 'framer-motion';
import { CalendarIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

interface ReportFiltersProps {
  dateRange: DateRangeType;
  department: DepartmentType;
  onDateRangeChange: (range: DateRangeType) => void;
  onDepartmentChange: (dept: DepartmentType) => void;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({
  dateRange,
  department,
  onDateRangeChange,
  onDepartmentChange
}) => {
  const selectClasses = `w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
    backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30
    focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300
    text-gray-700 dark:text-gray-300 pr-10`;

  const labelClasses = `block text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 
    bg-clip-text text-transparent mb-2`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6
      border border-gray-200/30 dark:border-gray-700/30 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 to-blue-500/50" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* بازه زمانی */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="relative"
        >
          <label className={labelClasses}>
            بازه زمانی
          </label>
          <div className="relative">
            <CalendarIcon className="h-5 w-5 absolute right-3 top-3 text-purple-500" />
            <select
              className={selectClasses}
              value={dateRange}
              onChange={(e) => onDateRangeChange(e.target.value as DateRangeType)}
            >
              <option value="last3months">3 ماه گذشته</option>
              <option value="last6months">6 ماه گذشته</option>
              <option value="lastyear">1 سال گذشته</option>
            </select>
          </div>
        </motion.div>

        {/* دپارتمان */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="relative"
        >
          <label className={labelClasses}>
            دپارتمان
          </label>
          <div className="relative">
            <BuildingOfficeIcon className="h-5 w-5 absolute right-3 top-3 text-blue-500" />
            <select
              className={selectClasses}
              value={department}
              onChange={(e) => onDepartmentChange(e.target.value as DepartmentType)}
            >
              <option value="all">همه دپارتمان‌ها</option>
              <option value="development">توسعه</option>
              <option value="design">طراحی</option>
              <option value="management">مدیریت</option>
            </select>
          </div>
        </motion.div>
      </div>

      {/* Export و فیلترهای اضافی */}
      <div className="flex justify-end mt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl
          shadow-lg shadow-purple-500/30 hover:shadow-blue-500/40 transition-all duration-300
          flex items-center gap-2 text-sm"
        >
          تنظیمات پیشرفته
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ReportFilters;