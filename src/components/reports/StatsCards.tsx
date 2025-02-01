import React from 'react';
import {
  CalendarIcon,
  UsersIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { MeetingMetrics } from '../../types/report';

interface StatCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: string | number;
  gradientFrom: string;
  gradientTo: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  gradientFrom,
  gradientTo,
  delay = 0
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.02 }}
    className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6
    border border-gray-200/30 dark:border-gray-700/30 relative overflow-hidden
    hover:shadow-xl transition-all duration-300"
  >
    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-${gradientFrom} to-${gradientTo}`} />
    <div className="flex items-center">
      <div className={`p-4 rounded-2xl bg-gradient-to-br from-${gradientFrom}/10 to-${gradientTo}/10
        border border-${gradientFrom}/20`}>
        <Icon className={`h-8 w-8 text-${gradientFrom}`} />
      </div>
      <div className="mr-4 flex flex-col">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
          {title}
        </p>
        <p className={`text-2xl font-bold bg-gradient-to-r from-${gradientFrom} to-${gradientTo} 
          bg-clip-text text-transparent`}>
          {value}
        </p>
      </div>
    </div>
  </motion.div>
);

interface StatsCardsProps {
  metrics: MeetingMetrics;
}

const StatsCards: React.FC<StatsCardsProps> = ({ metrics }) => {
  // کانفیگ کارت‌ها برای استفاده مجدد راحت‌تر
  const cardsConfig = [
    {
      icon: CalendarIcon,
      title: 'کل جلسات',
      value: metrics.totalMeetings,
      gradientFrom: 'purple-600',
      gradientTo: 'blue-600'
    },
    {
      icon: CheckCircleIcon,
      title: 'جلسات برگزار شده',
      value: metrics.completedMeetings,
      gradientFrom: 'blue-600',
      gradientTo: 'cyan-600'
    },
    {
      icon: UsersIcon,
      title: 'میانگین شرکت‌کنندگان',
      value: metrics.averageParticipants,
      gradientFrom: 'cyan-600',
      gradientTo: 'teal-600'
    },
    {
      icon: ClockIcon,
      title: 'میانگین مدت جلسات',
      value: `${metrics.averageDuration} دقیقه`,
      gradientFrom: 'teal-600',
      gradientTo: 'green-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {cardsConfig.map((card, index) => (
        <StatCard
          key={card.title}
          {...card}
          delay={index * 0.1}
        />
      ))}
    </motion.div>
  );
};

// کامپوننت مربوط به روند تغییرات
const TrendIndicator: React.FC<{ value: number }> = ({ value }) => {
  const isPositive = value > 0;
  return (
    <div className={`flex items-center text-sm ${
      isPositive ? 'text-green-600' : 'text-red-600'
    }`}>
      {isPositive ? '↑' : '↓'} {Math.abs(value)}%
    </div>
  );
};

export default StatsCards;