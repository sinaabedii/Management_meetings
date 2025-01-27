import React from 'react';
import { DateRangeType, DepartmentType } from '../../types/report';

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
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            بازه زمانی
          </label>
          <select
            className="input-primary w-full"
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value as DateRangeType)}
          >
            <option value="last3months">3 ماه گذشته</option>
            <option value="last6months">6 ماه گذشته</option>
            <option value="lastyear">1 سال گذشته</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            دپارتمان
          </label>
          <select
            className="input-primary w-full"
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value as DepartmentType)}
          >
            <option value="all">همه</option>
            <option value="development">توسعه</option>
            <option value="design">طراحی</option>
            <option value="management">مدیریت</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;