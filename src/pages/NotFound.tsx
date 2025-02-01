import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRegCalendarAlt } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 
          border border-gray-200/30 dark:border-gray-700/30 shadow-xl"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 8, ease: "linear" },
              scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30" />
            <FaRegCalendarAlt className="text-7xl relative bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent" />
          </motion.div>
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 
            bg-clip-text text-transparent mb-4"
          >
            ۴۰۴
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-3 mb-8"
          >
            <p className="text-lg text-gray-600 dark:text-gray-300">
              به نظر می‌رسد جلسه‌ای در کار نیست یا از دست رفته است!
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ممکن است لینک اشتباه باشد یا جلسه منقضی شده باشد.
            </p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 
              text-white rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-blue-500/40 
              transition-all duration-300 font-medium"
            >
              بازگشت به صفحه اصلی
            </Link>
          </motion.div>

          <div
            className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-500/5 
          to-blue-500/5 rounded-br-full"
          />
          <div
            className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-500/5 
          to-purple-500/5 rounded-tl-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
