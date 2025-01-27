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

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {meeting.title}
            </h2>
            <span
              className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                meeting.status
              )}`}
            >
              {getStatusText(meeting.status)}
            </span>
          </div>
          <div className="flex space-x-2 space-x-reverse">
            <button onClick={onEdit} className="btn-primary">
              ویرایش
            </button>
            <button
              onClick={onDelete}
              className="btn-secondary bg-red-600 hover:bg-red-700"
            >
              حذف
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <CalendarIcon className="h-5 w-5 ml-2" />
              <span>تاریخ: {format(meeting.date, "yyyy/MM/dd")}</span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <ClockIcon className="h-5 w-5 ml-2" />
              <span>
                زمان: {meeting.time} ({meeting.duration} دقیقه)
              </span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <MapPinIcon className="h-5 w-5 ml-2" />
              <span>مکان: {meeting.location}</span>
            </div>
          </div>

          {/* Participants */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <UsersIcon className="h-5 w-5 ml-2" />
              شرکت‌کنندگان
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <ul className="list-disc list-inside space-y-2">
                {meeting.participants.map((participant) => (
                  <li
                    key={participant.id}
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {participant.name} - {participant.role}
                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                      ({participant.department})
                    </span>
                    <span
                      className={`text-sm ${
                        participant.attendance === "present"
                          ? "text-green-600 dark:text-green-400"
                          : participant.attendance === "absent"
                          ? "text-red-600 dark:text-red-400"
                          : "text-yellow-600 dark:text-yellow-400"
                      }`}
                    >
                      {participant.attendance === "present"
                        ? "حاضر"
                        : participant.attendance === "absent"
                        ? "غایب"
                        : "نامشخص"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
            <DocumentTextIcon className="h-5 w-5 ml-2" />
            توضیحات
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {meeting.description}
            </p>
          </div>
        </div>

        {/* Agenda */}
        {meeting.agenda && meeting.agenda.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              دستور جلسه
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <ul className="list-decimal list-inside space-y-2">
                {meeting.agenda.map((item, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Attachments */}
        {meeting.attachments && meeting.attachments.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              فایل‌های پیوست
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {meeting.attachments.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <DocumentTextIcon className="h-6 w-6 text-gray-400 ml-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {file.size}
                    </p>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
                    دانلود
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingDetails;
