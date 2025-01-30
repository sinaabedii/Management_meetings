import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  DocumentIcon,
  CalendarIcon,
  UserIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  PencilIcon,
  LinkIcon,
  EyeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";

const MOCK_FILE = {
  id: 1,
  name: "گزارش پیشرفت پروژه.pdf",
  type: "application/pdf",
  size: "2.5 MB",
  uploadedBy: "علی محمدی",
  uploadDate: new Date(),
  lastModified: new Date(),
  downloads: 15,
  views: 45,
  meeting: "جلسه برنامه‌ریزی پروژه",
  description: "گزارش پیشرفت پروژه در سه ماهه اول سال",
  tags: ["گزارش", "پروژه", "مستندات"],
  versions: [
    {
      version: "1.2",
      uploadedBy: "علی محمدی",
      date: new Date(),
      changes: "بروزرسانی آمار و ارقام",
    },
    {
      version: "1.1",
      uploadedBy: "سارا احمدی",
      date: new Date(Date.now() - 86400000),
      changes: "اصلاح فرمت‌بندی",
    },
    {
      version: "1.0",
      uploadedBy: "علی محمدی",
      date: new Date(Date.now() - 172800000),
      changes: "نسخه اولیه",
    },
  ],
  accessHistory: [
    {
      user: "رضا کریمی",
      action: "view",
      date: new Date(Date.now() - 3600000),
    },
    {
      user: "مریم حسینی",
      action: "download",
      date: new Date(Date.now() - 7200000),
    },
  ],
};

const FileDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const file = MOCK_FILE;

  const getFileIcon = () => {
    switch (file.type) {
      case "application/pdf":
        return <DocumentIcon className="h-12 w-12 text-red-500" />;
      default:
        return <DocumentIcon className="h-12 w-12 text-gray-500" />;
    }
  };

  const handleDelete = () => {
    console.log("Deleting file:", id);
    navigate("/files");
  };

  const handleDownload = () => {
    console.log("Downloading file:", id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/files")}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <span className="ml-2">←</span>
        بازگشت به لیست فایل‌ها
      </button>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            {getFileIcon()}
            <div className="mr-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {file.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {file.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {file.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-600 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex space-x-2 space-x-reverse">
            <button
              onClick={handleDownload}
              className="btn-primary flex items-center"
            >
              <ArrowDownTrayIcon className="h-5 w-5 ml-2" />
              دانلود
            </button>
            <button
              onClick={() => navigate(`/files/${id}/edit`)}
              className="btn-secondary flex items-center"
            >
              <PencilIcon className="h-5 w-5 ml-2" />
              ویرایش
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="btn-secondary bg-red-600 hover:bg-red-700 text-white flex items-center"
            >
              <TrashIcon className="h-5 w-5 ml-2" />
              حذف
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 text-gray-400 ml-2" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                تاریخ آپلود
              </p>
              <p className="text-gray-900 dark:text-white">
                {format(file.uploadDate, "yyyy/MM/dd HH:mm")}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <UserIcon className="h-5 w-5 text-gray-400 ml-2" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                آپلود کننده
              </p>
              <p className="text-gray-900 dark:text-white">{file.uploadedBy}</p>
            </div>
          </div>
          <div className="flex items-center">
            <DocumentDuplicateIcon className="h-5 w-5 text-gray-400 ml-2" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                اندازه فایل
              </p>
              <p className="text-gray-900 dark:text-white">{file.size}</p>
            </div>
          </div>
          <div className="flex items-center">
            <LinkIcon className="h-5 w-5 text-gray-400 ml-2" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                جلسه مرتبط
              </p>
              <p className="text-gray-900 dark:text-white">{file.meeting}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <EyeIcon className="h-5 w-5 ml-2" />
            آمار استفاده
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                تعداد بازدید
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {file.views}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                تعداد دانلود
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {file.downloads}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            سابقه دسترسی
          </h2>
          <div className="space-y-4">
            {file.accessHistory.map((access, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-white">{access.user}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {access.action === "view" ? "مشاهده" : "دانلود"}
                  </p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {format(access.date, "HH:mm - yyyy/MM/dd")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* تاریخچه نسخه‌ها */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          تاریخچه نسخه‌ها
        </h2>
        <div className="space-y-4">
          {file.versions.map((version, index) => (
            <div
              key={index}
              className="flex items-start justify-between border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4"
            >
              <div>
                <p className="text-gray-900 dark:text-white font-medium">
                  نسخه {version.version}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {version.changes}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  توسط {version.uploadedBy}
                </p>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {format(version.date, "yyyy/MM/dd")}
                </p>
                <button className="text-primary-600 hover:text-primary-700 text-sm mt-1">
                  دانلود این نسخه
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal تایید حذف */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              تایید حذف فایل
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              آیا از حذف این فایل اطمینان دارید؟ این عمل غیرقابل بازگشت است.
            </p>
            <div className="flex justify-end space-x-4 space-x-reverse">
              <button
                className="btn-secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                انصراف
              </button>
              <button
                className="btn-primary bg-red-600 hover:bg-red-700"
                onClick={handleDelete}
              >
                حذف فایل
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDetails;
