import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AdjustmentsHorizontalIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  CalendarIcon,
  UserGroupIcon,
  ClockIcon,
  DocumentCheckIcon,
  PaperClipIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface AdvancedFiltersProps {
  onFilterChange: (filters: AdvancedFilterState) => void;
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

  const inputClasses = `w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
    backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30
    focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300
    text-gray-700 dark:text-gray-300`;

  const labelClasses = `block text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 
    bg-clip-text text-transparent mb-2`;

  const checkboxClasses = `rounded border-gray-300 dark:border-gray-600 
    text-purple-600 shadow-sm focus:border-purple-300 focus:ring 
    focus:ring-purple-200 focus:ring-opacity-50 dark:bg-gray-700
    dark:checked:bg-purple-600 transition-colors duration-200`;

  // ... (handlers remain the same)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6
      border border-gray-200/30 dark:border-gray-700/30 relative overflow-hidden mb-6"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 to-blue-500/50" />
      
      <motion.div 
        className="flex justify-between items-center mb-6"
        initial={false}
      >
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10">
            <AdjustmentsHorizontalIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            فیلترهای پیشرفته
          </h3>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10
          text-purple-600 dark:text-purple-400 rounded-xl transition-colors duration-300
          hover:from-purple-500/20 hover:to-blue-500/20"
        >
          {isExpanded ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
          {isExpanded ? 'بستن فیلترها' : 'نمایش فیلترها'}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6 overflow-hidden"
          >
            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className={labelClasses}>
                  <CalendarIcon className="h-5 w-5 inline-block ml-2" />
                  از تاریخ
                </label>
                <input
                  type="date"
                  className={inputClasses}
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                />
              </div>
              <div className="relative">
                <label className={labelClasses}>
                  <CalendarIcon className="h-5 w-5 inline-block ml-2" />
                  تا تاریخ
                </label>
                <input
                  type="date"
                  className={inputClasses}
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                />
              </div>
            </div>

            {/* Departments */}
            <div>
              <label className={labelClasses}>
                <UserGroupIcon className="h-5 w-5 inline-block ml-2" />
                دپارتمان‌ها
              </label>
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
              >
                {['توسعه', 'طراحی', 'مدیریت', 'مارکتینگ', 'منابع انسانی'].map((dept) => (
                  <motion.label
                    key={dept}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center p-3 rounded-xl cursor-pointer
                    ${filters.departments.includes(dept) 
                      ? 'bg-purple-500/10 border-purple-500/30' 
                      : 'bg-white/30 dark:bg-gray-800/30 border-gray-200/30 dark:border-gray-700/30'} 
                    border transition-all duration-300`}
                  >
                    <input
                      type="checkbox"
                      className={checkboxClasses}
                      checked={filters.departments.includes(dept)}
                      onChange={() => handleDepartmentToggle(dept)}
                    />
                    <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">{dept}</span>
                  </motion.label>
                ))}
              </motion.div>
            </div>

            {/* Duration and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>
                  <ClockIcon className="h-5 w-5 inline-block ml-2" />
                  مدت جلسه
                </label>
                <select
                  className={inputClasses}
                  value={filters.duration}
                  dir="ltr"
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                >
                  <option value="">همه</option>
                  <option value="0-30">کمتر از 30 دقیقه</option>
                  <option value="30-60">30 تا 60 دقیقه</option>
                  <option value="60-120">1 تا 2 ساعت</option>
                  <option value="120+">بیشتر از 2 ساعت</option>
                </select>
              </div>

              <div>
                <label className={labelClasses}>
                  <CheckCircleIcon className="h-5 w-5 inline-block ml-2" />
                  وضعیت
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'scheduled', label: 'برنامه‌ریزی شده' },
                    { value: 'completed', label: 'برگزار شده' },
                    { value: 'cancelled', label: 'لغو شده' }
                  ].map(({ value, label }) => (
                    <motion.label
                      key={value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center p-3 rounded-xl cursor-pointer
                      ${filters.status.includes(value) 
                        ? 'bg-purple-500/10 border-purple-500/30' 
                        : 'bg-white/30 dark:bg-gray-800/30 border-gray-200/30 dark:border-gray-700/30'} 
                      border transition-all duration-300`}
                    >
                      <input
                        type="checkbox"
                        className={checkboxClasses}
                        checked={filters.status.includes(value)}
                        onChange={() => handleStatusToggle(value)}
                      />
                      <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">{label}</span>
                    </motion.label>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>
                  <UserGroupIcon className="h-5 w-5 inline-block ml-2" />
                  تعداد شرکت‌کنندگان
                </label>
                <select
                  className={inputClasses}
                  value={filters.participantCount}
                  dir="ltr"
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
                <label className={labelClasses}>
                  <DocumentCheckIcon className="h-5 w-5 inline-block ml-2" />
                  نرخ تکمیل مصوبات
                </label>
                <select
                  className={inputClasses}
                  value={filters.completionRate}
                  dir="ltr"
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
            <div className="flex flex-wrap gap-4">
              <motion.label
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center p-3 rounded-xl cursor-pointer
                ${filters.hasAttachments 
                  ? 'bg-purple-500/10 border-purple-500/30' 
                  : 'bg-white/30 dark:bg-gray-800/30 border-gray-200/30 dark:border-gray-700/30'} 
                border transition-all duration-300`}
              >
                <input
                  type="checkbox"
                  className={checkboxClasses}
                  checked={filters.hasAttachments}
                  onChange={(e) => handleFilterChange('hasAttachments', e.target.checked)}
                />
                <PaperClipIcon className="h-5 w-5 mr-2 text-gray-500" />
                <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                  دارای فایل پیوست
                </span>
              </motion.label>

              <motion.label
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center p-3 rounded-xl cursor-pointer
                ${filters.hasResolutions 
                  ? 'bg-purple-500/10 border-purple-500/30' 
                  : 'bg-white/30 dark:bg-gray-800/30 border-gray-200/30 dark:border-gray-700/30'} 
                border transition-all duration-300`}
              >
                <input
                  type="checkbox"
                  className={checkboxClasses}
                  checked={filters.hasResolutions}
                  onChange={(e) => handleFilterChange('hasResolutions', e.target.checked)}
                />
                <DocumentCheckIcon className="h-5 w-5 mr-2 text-gray-500" />
                <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                  دارای مصوبه
                </span>
              </motion.label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdvancedFilters;