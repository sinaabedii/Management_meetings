import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRegCalendarAlt } from 'react-icons/fa';

const NotFound = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
    >
      {/* آیکون با افکت چرخش آرام */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
        className="mb-6"
      >
        <FaRegCalendarAlt className="text-6xl text-gray-500 dark:text-gray-300" />
      </motion.div>

      {/* عنوان صفحه */}
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-gray-900 dark:text-white"
      >
        ۴۰۴
      </motion.h1>

      {/* توضیحات */}
      <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
        به نظر می‌رسد جلسه‌ای در کار نیست یا از دست رفته است!
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        ممکن است لینک اشتباه باشد یا جلسه منقضی شده باشد.
      </p>

      {/* دکمه بازگشت */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6"
      >
        <Link
          to="/"
          className="px-6 py-2 text-white bg-primary-600 hover:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-300 rounded-xl shadow-md transition-all"
        >
          بازگشت به صفحه اصلی
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;
