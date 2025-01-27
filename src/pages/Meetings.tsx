import { useState } from "react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import moment from "moment-jalaali";
import CreateMeetingModal from "../components/meetings/CreateMeetingModal";
import { Link } from "react-router-dom";

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
  // ... می‌توانید موارد بیشتری اضافه کنید
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "scheduled":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
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

const Meetings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredMeetings = MOCK_MEETINGS.filter((meeting) =>
    meeting.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          مدیریت جلسات
        </h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 ml-2" />
          جلسه جدید
        </button>
      </div>
      {/* Search and Filter Section */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="input-primary pr-10"
            placeholder="جستجو در جلسات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/* Meetings List */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                عنوان
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                تاریخ و زمان
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                مدت
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                وضعیت
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                شرکت‌کنندگان
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">عملیات</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredMeetings.map((meeting) => (
              <tr key={meeting.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/meetings/${meeting.id}`}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    <div className="text-sm font-medium">{meeting.title}</div>
                    <div className="text-sm text-gray-500">
                      {meeting.location}
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {moment(meeting.date).format("jYYYY/jMM/jDD")}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {meeting.time}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {meeting.duration} دقیقه
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      meeting.status
                    )}`}
                  >
                    {getStatusText(meeting.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {meeting.participants.join("، ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 ml-4">
                    ویرایش
                  </button>
                  <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateMeetingModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={(data) => {
          console.log("New meeting data:", data);
          setShowCreateModal(false);
        }}
      />
    </div>
  );
};

export default Meetings;
