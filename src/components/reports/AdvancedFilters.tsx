import React, { useState } from 'react';

interface AdvancedFiltersProps {
  onFilterChange: (filters: AdvancedFilterState) => void;
}

export interface AdvancedFilterState {
  dateFrom: string;
  dateTo: string;
  departments: string[];
  duration: string;
  status: string[];
  participantCount: string;
  hasAttachments: boolean;
  hasResolutions: boolean;
  completionRate: string;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<AdvancedFilterState>({
    dateFrom: '',
    dateTo: '',
    departments: [],
    duration: '',
    status: [],
    participantCount: '',
    hasAttachments: false,
    hasResolutions: false,
    completionRate: ''
  });

  const handleFilterChange = (key: keyof AdvancedFilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDepartmentToggle = (dept: string) => {
    const newDepartments = filters.departments.includes(dept)
      ? filters.departments.filter(d => d !== dept)
      : [...filters.departments, dept];
    handleFilterChange('departments', newDepartments);
  };

  const handleStatusToggle = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    handleFilterChange('status', newStatus);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          فیلترهای پیشرفته
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          {isExpanded ? 'بستن' : 'نمایش فیلترهای بیشتر'}
        </button>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              از تاریخ
            </label>
            <input
              type="date"
              className="input-primary w-full"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              تا تاریخ
            </label>
            <input
              type="date"
              className="input-primary w-full"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            />
          </div>

          {/* Departments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              دپارتمان‌ها
            </label>
            <div className="space-y-2">
              {['توسعه', 'طراحی', 'مدیریت', 'مارکتینگ', 'منابع انسانی'].map((dept) => (
                <label key={dept} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                    checked={filters.departments.includes(dept)}
                    onChange={() => handleDepartmentToggle(dept)}
                  />
                  <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">{dept}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              مدت جلسه
            </label>
            <select
              className="input-primary w-full"
              value={filters.duration}
              onChange={(e) => handleFilterChange('duration', e.target.value)}
            >
              <option value="">همه</option>
              <option value="0-30">کمتر از 30 دقیقه</option>
              <option value="30-60">30 تا 60 دقیقه</option>
              <option value="60-120">1 تا 2 ساعت</option>
              <option value="120+">بیشتر از 2 ساعت</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              وضعیت
            </label>
            <div className="space-y-2">
              {['scheduled', 'completed', 'cancelled'].map((status) => (
                <label key={status} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                    checked={filters.status.includes(status)}
                    onChange={() => handleStatusToggle(status)}
                  />
                  <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                    {status === 'scheduled' ? 'برنامه‌ریزی شده' :
                     status === 'completed' ? 'برگزار شده' :
                     'لغو شده'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Filters */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                تعداد شرکت‌کنندگان
              </label>
              <select
                className="input-primary w-full"
                value={filters.participantCount}
                onChange={(e) => handleFilterChange('participantCount', e.target.value)}
              >
                <option value="">همه</option>
                <option value="1-5">1 تا 5 نفر</option>
                <option value="6-10">6 تا 10 نفر</option>
                <option value="11-20">11 تا 20 نفر</option>
                <option value="20+">بیشتر از 20 نفر</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                نرخ تکمیل مصوبات
              </label>
              <select
                className="input-primary w-full"
                value={filters.completionRate}
                onChange={(e) => handleFilterChange('completionRate', e.target.value)}
              >
                <option value="">همه</option>
                <option value="0-25">0-25%</option>
                <option value="26-50">26-50%</option>
                <option value="51-75">51-75%</option>
                <option value="76-100">76-100%</option>
              </select>
            </div>
          </div>

          {/* Additional Toggles */}
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                checked={filters.hasAttachments}
                onChange={(e) => handleFilterChange('hasAttachments', e.target.checked)}
              />
              <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                دارای فایل پیوست
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                checked={filters.hasResolutions}
                onChange={(e) => handleFilterChange('hasResolutions', e.target.checked)}
              />
              <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                دارای مصوبه
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;