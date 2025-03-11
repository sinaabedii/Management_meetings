import { useState } from "react";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  UserGroupIcon,
  ClockIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import moment from "moment-jalaali";
import CreateMeetingModal from "../components/meetings/CreateMeetingModal";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MockVideoCall from "../components/meetings/MockVideoCall";

const MOCK_MEETINGS = [
  {
    id: 1,
    title: "جلسه برنامه‌ریزی پروژه جدید",
    date: new Date(2025, 0, 30),
    time: "10:00",
    duration: 60,
    status: "scheduled",
    participants: ["علی محمدی", "سارا احمدی", "رضا کریمی"],
    location: "اتاق جلسات اصلی",
  },
  {
    id: 2,
    title: "بررسی گزارش ماهانه",
    date: new Date(2025, 0, 28),
    time: "14:30",
    duration: 90,
    status: "completed",
    participants: ["مریم حسینی", "امیر رضایی"],
    location: "اتاق کنفرانس",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "scheduled":
      return {
        bg: "bg-blue-100 dark:bg-blue-900/50",
        text: "text-blue-800 dark:text-blue-300",
        icon: "🕒",
      };
    case "completed":
      return {
        bg: "bg-green-100 dark:bg-green-900/50",
        text: "text-green-800 dark:text-green-300",
        icon: "✓",
      };
    case "cancelled":
      return {
        bg: "bg-red-100 dark:bg-red-900/50",
        text: "text-red-800 dark:text-red-300",
        icon: "✕",
      };
    case "active_call":
      return {
        bg: "bg-purple-100 dark:bg-purple-900/50",
        text: "text-purple-800 dark:text-purple-300",
        icon: "📹",
      };
    default:
      return {
        bg: "bg-gray-100 dark:bg-gray-900/50",
        text: "text-gray-800 dark:text-gray-300",
        icon: "?",
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
    case "active_call":
      return "تماس تصویری فعال";
    default:
      return status;
  }
};

const StatCard = ({
  title,
  value,
  icon,
  className,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`${className} p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
    border border-gray-200/30 dark:border-gray-700/30 shadow-lg relative overflow-hidden`}
  >
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 to-blue-500/50" />
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold mt-1 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {value}
        </p>
      </div>
      <div className="text-purple-500 dark:text-purple-400">{icon}</div>
    </div>
  </motion.div>
);

const Meetings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [view, setView] = useState("grid");
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [currentMeetingId, setCurrentMeetingId] = useState<number | null>(null);

  const filteredMeetings = MOCK_MEETINGS.filter((meeting) => {
    const matchesSearch = meeting.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || meeting.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: MOCK_MEETINGS.length,
    scheduled: MOCK_MEETINGS.filter((m) => m.status === "scheduled").length,
    completed: MOCK_MEETINGS.filter((m) => m.status === "completed").length,
  };

  const handleStartVideoCall = (meetingId: number) => {
    setCurrentMeetingId(meetingId);
    setShowVideoCall(true);
  };

  const handleQuickCall = () => {
    setCurrentMeetingId(null);
    setShowVideoCall(true);
  };

  return (
    <div className="container mx-auto px-6">
      {showVideoCall ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-6xl relative">
            <button
              className="absolute -top-12 right-0 text-white bg-red-500 p-2 rounded-full"
              onClick={() => setShowVideoCall(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <MockVideoCall
              meetingId={currentMeetingId}
              onClose={() => setShowVideoCall(false)}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex md:flex-row justify-between items-start md:items-center gap-4"
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                مدیریت جلسات
              </h1>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleQuickCall}
                  className="px-2 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl
                  shadow-lg shadow-blue-500/30 hover:shadow-green-500/40 transition-all duration-300
                  flex items-center gap-2"
                >
                  <VideoCameraIcon className="h-5 w-5" />
                  تماس سریع
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCreateModal(true)}
                  className="px-2 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl
                  shadow-lg shadow-purple-500/30 hover:shadow-blue-500/40 transition-all duration-300
                  flex items-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  جلسه جدید
                </motion.button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <StatCard
              title="کل جلسات"
              value={stats.total}
              icon={<CalendarIcon className="h-8 w-8" />}
              className="bg-gradient-to-br from-purple-500/10 to-blue-500/10"
            />
            <StatCard
              title="جلسات برنامه‌ریزی شده"
              value={stats.scheduled}
              icon={<ClockIcon className="h-8 w-8" />}
              className="bg-gradient-to-br from-blue-500/10 to-green-500/10"
            />
            <StatCard
              title="جلسات برگزار شده"
              value={stats.completed}
              icon={<UserGroupIcon className="h-8 w-8" />}
              className="bg-gradient-to-br from-green-500/10 to-teal-500/10"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pr-10 px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
                backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30
                focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300
                placeholder:text-gray-400"
                placeholder="جستجو در جلسات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FunnelIcon className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="w-full pr-10 px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
                backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30
                focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="scheduled">برنامه‌ریزی شده</option>
                <option value="completed">برگزار شده</option>
                <option value="cancelled">لغو شده</option>
                <option value="active_call">تماس تصویری فعال</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setView("grid")}
                className={`px-4 py-2 rounded-xl ${
                  view === "grid"
                    ? "bg-purple-500 text-white"
                    : "bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300"
                } transition-all duration-300`}
              >
                نمایش کارتی
              </button>
              <button
                onClick={() => setView("table")}
                className={`px-4 py-2 rounded-xl ${
                  view === "table"
                    ? "bg-purple-500 text-white"
                    : "bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300"
                } transition-all duration-300`}
              >
                نمایش جدولی
              </button>
            </div>
          </motion.div>

          {view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMeetings.map((meeting, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={meeting.id}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl 
                  border border-gray-200/30 dark:border-gray-700/30 shadow-lg overflow-hidden
                  hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Link
                        to={`/meetings/${meeting.id}`}
                        className="text-lg font-semibold hover:text-purple-600 dark:hover:text-purple-400 
                        transition-colors duration-300"
                      >
                        {meeting.title}
                      </Link>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          getStatusColor(meeting.status).bg
                        } 
                      ${
                        getStatusColor(meeting.status).text
                      } flex items-center gap-1`}
                      >
                        {getStatusColor(meeting.status).icon}{" "}
                        {getStatusText(meeting.status)}
                      </span>
                    </div>

                    <div className="space-y-2 text-gray-600 dark:text-gray-300">
                      <p className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                        {moment(meeting.date).format("jYYYY/jMM/jDD")} -{" "}
                        {meeting.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <ClockIcon className="h-5 w-5 text-gray-400" />
                        {meeting.duration} دقیقه
                      </p>
                      <p className="flex items-center gap-2">
                        <UserGroupIcon className="h-5 w-5 text-gray-400" />
                        {meeting.participants.length} نفر
                      </p>
                    </div>

                    <div className="mt-4 flex justify-end gap-3">
                      <button
                        onClick={() => handleStartVideoCall(meeting.id)}
                        className="text-purple-600 hover:text-purple-700 dark:text-purple-400 
                        dark:hover:text-purple-300 transition-colors duration-300 flex items-center"
                      >
                        <VideoCameraIcon className="h-5 w-5 ml-1" />
                        تماس تصویری
                      </button>
                      <button
                        className="text-purple-600 hover:text-purple-700 dark:text-purple-400 
                        dark:hover:text-purple-300 transition-colors duration-300"
                      >
                        ویرایش
                      </button>
                      <button
                        className="text-red-600 hover:text-red-700 dark:text-red-400 
                        dark:hover:text-red-300 transition-colors duration-300"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden
              border border-gray-200/30 dark:border-gray-700/30 shadow-lg"
            >
              <table className="min-w-full divide-y divide-gray-200/30 dark:divide-gray-700/30">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-gray-700/50">
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 
                      dark:text-gray-300 uppercase tracking-wider"
                    >
                      عنوان
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 
                      dark:text-gray-300 uppercase tracking-wider"
                    >
                      تاریخ و زمان
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 
                      dark:text-gray-300 uppercase tracking-wider"
                    >
                      مدت
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 
                      dark:text-gray-300 uppercase tracking-wider"
                    >
                      وضعیت
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 
                      dark:text-gray-300 uppercase tracking-wider"
                    >
                      شرکت‌کنندگان
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">عملیات</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/30 dark:divide-gray-700/30">
                  {filteredMeetings.map((meeting, index) => (
                    <motion.tr
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={meeting.id}
                      className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <Link
                          to={`/meetings/${meeting.id}`}
                          className="group flex flex-col"
                        >
                          <span
                            className="text-sm font-medium text-gray-900 dark:text-white 
                            group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200"
                          >
                            {meeting.title}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {meeting.location}
                          </span>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900 dark:text-white">
                          {moment(meeting.date).format("jYYYY/jMM/jDD")}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">
                          {meeting.time}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900 dark:text-white">
                          {meeting.duration} دقیقه
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            getStatusColor(meeting.status).bg
                          } 
                          ${
                            getStatusColor(meeting.status).text
                          } flex items-center gap-1 w-fit`}
                        >
                          {getStatusColor(meeting.status).icon}{" "}
                          {getStatusText(meeting.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {meeting.participants.map((participant, i) => (
                            <span
                              key={i}
                              className="text-sm text-gray-500 dark:text-gray-400"
                            >
                              {i > 0 && "، "}
                              {participant}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right space-x-4 space-x-reverse">
                        <button
                          onClick={() => handleStartVideoCall(meeting.id)}
                          className="text-purple-600 hover:text-purple-700 dark:text-purple-400 
                          dark:hover:text-purple-300 transition-colors duration-200 inline-flex items-center"
                        >
                          <VideoCameraIcon className="h-5 w-5 ml-1" />
                          تماس تصویری
                        </button>
                        <button
                          className="text-purple-600 hover:text-purple-700 dark:text-purple-400 
                          dark:hover:text-purple-300 transition-colors duration-200"
                        >
                          ویرایش
                        </button>
                        <button
                          className="text-red-600 hover:text-red-700 dark:text-red-400 
                          dark:hover:text-red-300 transition-colors duration-200"
                        >
                          حذف
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <CreateMeetingModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onSubmit={(data) => {
              setShowCreateModal(false);
            }}
          />
        </>
      )}
    </div>
  );
};

export default Meetings;
