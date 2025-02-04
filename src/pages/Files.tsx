import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  DocumentIcon,
  PhotoIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
  MagnifyingGlassIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  PencilIcon,
  ArrowDownTrayIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

interface File {
  id: number;
  name: string;
  type: "document" | "image" | "video" | "audio" | "other";
  size: string;
  uploadedBy: string;
  uploadDate: string;
  lastModified: string;
  meeting?: string;
  tags: string[];
}

const MOCK_FILES: File[] = [
  {
    id: 1,
    name: "صورتجلسه برنامه‌ریزی.pdf",
    type: "document",
    size: "2.5 MB",
    uploadedBy: "علی محمدی",
    uploadDate: "1402/11/01",
    lastModified: "1402/11/05",
    meeting: "جلسه برنامه‌ریزی پروژه",
    tags: ["صورتجلسه", "مهم"],
  },
  {
    id: 2,
    name: "نمودار گانت.xlsx",
    type: "document",
    size: "1.8 MB",
    uploadedBy: "سارا احمدی",
    uploadDate: "1402/11/02",
    lastModified: "1402/11/02",
    meeting: "جلسه برنامه‌ریزی پروژه",
    tags: ["برنامه‌ریزی"],
  },
];

const getFileIcon = (type: File["type"]) => {
  switch (type) {
    case "document":
      return <DocumentIcon className="h-8 w-8 text-blue-500" />;
    case "image":
      return <PhotoIcon className="h-8 w-8 text-green-500" />;
    case "video":
      return <VideoCameraIcon className="h-8 w-8 text-red-500" />;
    case "audio":
      return <MusicalNoteIcon className="h-8 w-8 text-purple-500" />;
    default:
      return <DocumentIcon className="h-8 w-8 text-gray-500" />;
  }
};

const Files = () => {
  const [files, setFiles] = useState<File[]>(MOCK_FILES);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedMeeting, setSelectedMeeting] = useState<string>("all");
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log("Files to upload:", files);
  };

  const handleDeleteSelected = () => {
    setFiles(files.filter((file) => !selectedFiles.includes(file.id)));
    setSelectedFiles([]);
  };

  const filteredFiles = files.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesType = selectedType === "all" || file.type === selectedType;
    const matchesMeeting =
      selectedMeeting === "all" || file.meeting === selectedMeeting;
    return matchesSearch && matchesType && matchesMeeting;
  });

  return (
    <div className="container mx-auto px-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          مدیریت فایل‌ها
        </h1>
        <div className="flex items-center space-x-4 space-x-reverse">
          {selectedFiles.length > 0 && (
            <>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-red-500 text-white rounded-xl shadow-lg shadow-red-500/30 
                hover:shadow-red-500/40 transition-all duration-300 flex items-center gap-2"
                onClick={handleDeleteSelected}
              >
                <TrashIcon className="h-5 w-5" />
                حذف انتخاب شده
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl 
                shadow-lg shadow-purple-500/30 hover:shadow-blue-500/40 transition-all duration-300 
                flex items-center gap-2"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                دانلود
              </motion.button>
            </>
          )}
          <motion.label
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl 
            shadow-lg shadow-purple-500/30 hover:shadow-blue-500/40 transition-all duration-300 
            flex items-center gap-2 cursor-pointer"
          >
            <ArrowUpTrayIcon className="h-5 w-5" />
            آپلود فایل
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </motion.label>
        </div>
      </motion.div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl 
        border border-gray-200/30 dark:border-gray-700/30 shadow-lg p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو در فایل‌ها..."
              className="w-full pr-10 px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
              backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30
              focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
              backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30
              focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
              value={selectedType}
              dir="ltr"
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">همه انواع فایل</option>
              <option value="document">اسناد</option>
              <option value="image">تصاویر</option>
              <option value="video">ویدیوها</option>
              <option value="audio">فایل‌های صوتی</option>
            </select>
          </div>
          <div>
            <select
              className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
              backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30
              focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
              value={selectedMeeting}
              dir="ltr"
              onChange={(e) => setSelectedMeeting(e.target.value)}
            >
              <option value="all">همه جلسات</option>
              <option value="جلسه برنامه‌ریزی پروژه">
                جلسه برنامه‌ریزی پروژه
              </option>
            </select>
          </div>
          <div className="flex justify-end">
            <div className="bg-white/80 dark:bg-gray-700/80 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                شبکه‌ای
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                لیستی
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFiles.map((file, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={file.id}
              className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl 
              border border-gray-200/30 dark:border-gray-700/30 shadow-lg
              hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300
              relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 to-blue-500/50 
              transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
              />

              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div
                    className="p-3 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl 
                  group-hover:scale-110 transition-all duration-300"
                  >
                    {getFileIcon(file.type)}
                  </div>
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-purple-600 rounded-lg border-gray-300"
                    checked={selectedFiles.includes(file.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFiles([...selectedFiles, file.id]);
                      } else {
                        setSelectedFiles(
                          selectedFiles.filter((id) => id !== file.id)
                        );
                      }
                    }}
                  />
                </div>

                <Link
                  to={`/files/${file.id}`}
                  className="mt-4 font-medium text-gray-900 dark:text-white hover:text-purple-600 
                  dark:hover:text-purple-400 transition-colors duration-300 block"
                >
                  {file.name}
                </Link>

                <div className="mt-3 space-y-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    اندازه: {file.size}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    آپلود: {file.uploadDate}
                  </p>
                  {file.meeting && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      جلسه: {file.meeting}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {file.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-gradient-to-r from-purple-500/10 to-blue-500/10 
                      rounded-lg text-gray-600 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  className="mt-4 flex justify-end space-x-2 space-x-reverse opacity-0 group-hover:opacity-100 
                transition-opacity duration-300"
                >
                  <button className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors duration-300">
                    <PencilIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors duration-300">
                    <DocumentDuplicateIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors duration-300">
                    <ArrowDownTrayIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl 
          border border-gray-200/30 dark:border-gray-700/30 shadow-lg overflow-hidden"
        >
          <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
            <thead className="bg-gray-50/50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  نام فایل
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  نوع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  نام فایل
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  اندازه
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  تاریخ آپلود
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  آپلود کننده
                </th>{" "}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
              {filteredFiles.map((file, index) => (
                <motion.tr
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={file.id}
                  className="group hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-300"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFiles([...selectedFiles, file.id]);
                        } else {
                          setSelectedFiles(
                            selectedFiles.filter((id) => id !== file.id)
                          );
                        }
                      }}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default Files;
