import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  ArrowLeftIcon,
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
    <div className="container mx-auto px-6 ">
      <motion.button
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        onClick={() => navigate("/files")}
        className="mb-6 flex items-center text-gray-600 hover:text-purple-600 dark:text-gray-400 
        dark:hover:text-purple-400 transition-colors duration-300"
      >
        <ArrowLeftIcon className="h-5 w-5 ml-2" />
        بازگشت به لیست فایل‌ها
      </motion.button>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl 
        border border-gray-200/30 dark:border-gray-700/30 shadow-lg p-8 mb-8"
      >
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-start">
            <div className="p-4 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl">
              {getFileIcon()}
            </div>
            <div className="mr-4">
              <motion.h1 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 
                bg-clip-text text-transparent"
              >
                {file.name}
              </motion.h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {file.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {file.tags.map((tag, index) => (
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 
                    rounded-lg text-sm text-gray-600 dark:text-gray-300"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex space-x-2 space-x-reverse">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl 
              shadow-lg shadow-purple-500/30 hover:shadow-blue-500/40 transition-all duration-300 
              flex items-center"
            >
              <ArrowDownTrayIcon className="h-5 w-5 ml-2" />
              دانلود
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/files/${id}/edit`)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-gray-700 dark:text-gray-300 
              rounded-xl backdrop-blur-md flex items-center transition-all duration-300"
            >
              <PencilIcon className="h-5 w-5 ml-2" />
              ویرایش
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-xl shadow-lg shadow-red-500/30 
              hover:shadow-red-500/40 transition-all duration-300 flex items-center"
            >
              <TrashIcon className="h-5 w-5 ml-2" />
              حذف
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {[
            { icon: CalendarIcon, title: 'تاریخ آپلود', value: format(file.uploadDate, "yyyy/MM/dd HH:mm") },
            { icon: UserIcon, title: 'آپلود کننده', value: file.uploadedBy },
            { icon: DocumentDuplicateIcon, title: 'اندازه فایل', value: file.size },
            { icon: LinkIcon, title: 'جلسه مرتبط', value: file.meeting }
          ].map((item, index) => (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="flex items-center p-4 bg-white/30 dark:bg-gray-700/30 rounded-xl 
              backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20"
            >
              <item.icon className="h-5 w-5 text-purple-500 ml-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
                <p className="font-medium text-gray-900 dark:text-white">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl 
          border border-gray-200/30 dark:border-gray-700/30 shadow-lg p-6"
        >
          <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 
          bg-clip-text text-transparent mb-4 flex items-center">
            <EyeIcon className="h-5 w-5 ml-2 text-purple-500" />
            آمار استفاده
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'تعداد بازدید', value: file.views },
              { title: 'تعداد دانلود', value: file.downloads }
            ].map((stat, index) => (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                key={index}
                className="p-4 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-xl"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 
                bg-clip-text text-transparent">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl 
          border border-gray-200/30 dark:border-gray-700/30 shadow-lg p-6"
        >
          <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 
          bg-clip-text text-transparent mb-4">
            سابقه دسترسی
          </h2>
          <div className="space-y-4">
            {file.accessHistory.map((access, index) => (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                key={index}
                className="flex items-center justify-between p-3 bg-gradient-to-br 
                from-purple-500/5 to-blue-500/5 rounded-xl"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{access.user}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {access.action === "view" ? "مشاهده" : "دانلود"}
                  </p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {format(access.date, "HH:mm - yyyy/MM/dd")}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl 
        border border-gray-200/30 dark:border-gray-700/30 shadow-lg p-6"
      >
        <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 
        bg-clip-text text-transparent mb-4">
          تاریخچه نسخه‌ها
        </h2>
        <div className="space-y-4">
          {file.versions.map((version, index) => (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              key={index}
              className="flex items-start justify-between p-4 border-b border-gray-200/30 
              dark:border-gray-700/30 last:border-0"
            >
              <div>
                <p className="font-medium bg-gradient-to-r from-purple-600 to-blue-600 
                bg-clip-text text-transparent">
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-purple-600 hover:text-purple-700 dark:text-purple-400 
                  dark:hover:text-purple-300 text-sm mt-1 transition-colors duration-300"
                >
                  دانلود این نسخه
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal تایید حذف */}
      {showDeleteConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 
            bg-clip-text text-transparent mb-4">
              تایید حذف فایل
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              آیا از حذف این فایل اطمینان دارید؟ این عمل غیرقابل بازگشت است.
            </p>
            <div className="flex justify-end space-x-4 space-x-reverse">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl"
                onClick={() => setShowDeleteConfirm(false)}
              >
                انصراف</motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-red-500 text-white rounded-xl shadow-lg shadow-red-500/30 
                hover:shadow-red-500/40 transition-all duration-300"
                onClick={handleDelete}
              >
                حذف فایل
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default FileDetails;
