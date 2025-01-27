import React from 'react';
import {
  ArrowDownTrayIcon,
  DocumentArrowDownIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline';

interface ExportButtonProps {
  onExport: () => void;
  className?: string;
  children: React.ReactNode;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onExport, className = '', children }) => (
  <button
    onClick={onExport}
    className={`flex items-center px-4 py-2 rounded-lg shadow hover:shadow-md transition-all ${className}`}
  >
    {children}
  </button>
);

const ReportExport = () => {
  const exportToExcel = () => {
    // در اینجا از یک کتابخانه مثل xlsx برای ساخت فایل اکسل استفاده می‌کنیم
    console.log('Exporting to Excel...');
  };

  const exportToPDF = () => {
    // در اینجا از یک کتابخانه مثل jspdf برای ساخت PDF استفاده می‌کنیم
    console.log('Exporting to PDF...');
  };

  const exportToCSV = () => {
    // در اینجا از یک کتابخانه مثل papaparse برای ساخت CSV استفاده می‌کنیم
    console.log('Exporting to CSV...');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
        <ArrowDownTrayIcon className="h-5 w-5 ml-2" />
        خروجی گزارش
      </h3>
      
      <div className="flex flex-wrap gap-4">
        <ExportButton
          onExport={exportToExcel}
          className="bg-green-500 text-white hover:bg-green-600"
        >
          <DocumentChartBarIcon className="h-5 w-5 ml-2" />
          خروجی Excel
        </ExportButton>

        <ExportButton
          onExport={exportToPDF}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          <DocumentArrowDownIcon className="h-5 w-5 ml-2" />
          خروجی PDF
        </ExportButton>

        <ExportButton
          onExport={exportToCSV}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          <DocumentChartBarIcon className="h-5 w-5 ml-2" />
          خروجی CSV
        </ExportButton>
      </div>
    </div>
  );
};

export default ReportExport;