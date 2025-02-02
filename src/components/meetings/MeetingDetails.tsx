import React from "react";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { Meeting } from "../../types/meeting";
import { motion } from "framer-motion";

interface MeetingDetailsProps {
  meeting: Meeting;
  onEdit: () => void;
  onDelete: () => void;
}

const MeetingDetails: React.FC<MeetingDetailsProps> = ({
  meeting,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return {
          bg: "bg-blue-100/50 dark:bg-blue-900/30",
          text: "text-blue-800 dark:text-blue-300",
          border: "border-blue-200 dark:border-blue-800",
          icon: "🕒"
        };
      case "completed":
        return {
          bg: "bg-green-100/50 dark:bg-green-900/30",
          text: "text-green-800 dark:text-green-300",
          border: "border-green-200 dark:border-green-800",
          icon: "✓"
        };
      case "cancelled":
        return {
          bg: "bg-red-100/50 dark:bg-red-900/30",
          text: "text-red-800 dark:text-red-300",
          border: "border-red-200 dark:border-red-800",
          icon: "✕"
        };
      default:
        return {
          bg: "bg-gray-100/50 dark:bg-gray-900/30",
          text: "text-gray-800 dark:text-gray-300",
          border: "border-gray-200 dark:border-gray-800",
          icon: "?"
        };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "scheduled":
        return "برنامه‌ریزی شده";
      case "completed":
        return "برگزار شده";
      case "cancelled":
        return "لغو شده";
      default:
        return status;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl 
      border border-gray-200/30 dark:border-gray-700/30 shadow-lg overflow-hidden
      relative"
    >
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 to-blue-500/50" />

      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm">
        <motion.div 
          className="flex justify-between items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {meeting.title}
            </h2>
            <span
              className={`mt-2 inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium
              ${getStatusColor(meeting.status).bg} ${getStatusColor(meeting.status).text}
              border ${getStatusColor(meeting.status).border} backdrop-blur-sm`}
            >
              {getStatusColor(meeting.status).icon} {getStatusText(meeting.status)}
            </span>
          </div>
          <div className="flex space-x-2 space-x-reverse">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEdit}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl
              shadow-lg shadow-purple-500/30 hover:shadow-blue-500/40 transition-all duration-300"
            >
              ویرایش
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDelete}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl
              shadow-lg shadow-red-500/30 hover:shadow-pink-500/40 transition-all duration-300"
            >
              حذف
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Basic Info */}
          <div className="space-y-4 p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl backdrop-blur-sm
          border border-gray-200/30 dark:border-gray-700/30">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <CalendarIcon className="h-5 w-5 ml-2 text-purple-500" />
              <span>تاریخ: {format(meeting.date, "yyyy/MM/dd")}</span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <ClockIcon className="h-5 w-5 ml-2 text-blue-500" />
              <span>زمان: {meeting.time} ({meeting.duration} دقیقه)</span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <MapPinIcon className="h-5 w-5 ml-2 text-green-500" />
              <span>مکان: {meeting.location}</span>
            </div>
          </div>

          {/* Participants */}
          <motion.div 
            className="p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl backdrop-blur-sm
            border border-gray-200/30 dark:border-gray-700/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 flex items-center">
              <UsersIcon className="h-5 w-5 ml-2 text-purple-500" />
              شرکت‌کنندگان
            </h3>
            <div className="space-y-2">
              {meeting.participants.map((participant, index) => (
                <motion.div
                  key={participant.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100/50
                  dark:hover:bg-gray-700/50 transition-all duration-300"
                >
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {participant.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                      {participant.role} - {participant.department}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-lg text-sm ${
                      participant.attendance === "present"
                        ? "bg-green-100/50 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : participant.attendance === "absent"
                        ? "bg-red-100/50 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        : "bg-yellow-100/50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                    }`}
                  >
                    {participant.attendance === "present"
                      ? "حاضر"
                      : participant.attendance === "absent"
                      ? "غایب"
                      : "نامشخص"}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Description */}
        <motion.div 
          className="mt-6 p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl backdrop-blur-sm
          border border-gray-200/30 dark:border-gray-700/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 flex items-center">
            <DocumentTextIcon className="h-5 w-5 ml-2 text-purple-500" />
            توضیحات
          </h3>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {meeting.description}
          </p>
        </motion.div>

        {/* Attachments */}
        {meeting.attachments && meeting.attachments.length > 0 && (
          <motion.div 
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
              فایل‌های پیوست
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {meeting.attachments.map((file, index) => (
                <motion.div
                  key={file.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl
                  backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30
                  shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <DocumentTextIcon className="h-6 w-6 text-purple-500 ml-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {file.size}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400
                    dark:hover:text-purple-300 transition-colors duration-300"
                  >
                    دانلود
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MeetingDetails;