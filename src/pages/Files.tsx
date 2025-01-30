import React, { useState } from "react";
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          مدیریت فایل‌ها
        </h1>
        <div className="flex items-center space-x-4 space-x-reverse">
          {selectedFiles.length > 0 && (
            <>
              <button
                onClick={handleDeleteSelected}
                className="btn-secondary bg-red-500 hover:bg-red-600 text-white flex items-center"
              >
                <TrashIcon className="h-5 w-5 ml-2" />
                حذف انتخاب شده
              </button>
              <button className="btn-secondary flex items-center">
                <ArrowDownTrayIcon className="h-5 w-5 ml-2" />
                دانلود
              </button>
            </>
          )}
          <label className="btn-primary cursor-pointer flex items-center">
            <ArrowUpTrayIcon className="h-5 w-5 ml-2" />
            آپلود فایل
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو در فایل‌ها..."
              className="input-primary pr-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="input-primary w-full"
              value={selectedType}
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
              className="input-primary w-full"
              value={selectedMeeting}
              onChange={(e) => setSelectedMeeting(e.target.value)}
            >
              <option value="all">همه جلسات</option>
              <option value="جلسه برنامه‌ریزی پروژه">
                جلسه برنامه‌ریزی پروژه
              </option>
            </select>
          </div>
          <div className="flex justify-end">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                className={`px-3 py-1 rounded-md ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-gray-600 shadow"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => setViewMode("grid")}
              >
                شبکه‌ای
              </button>
              <button
                className={`px-3 py-1 rounded-md ${
                  viewMode === "list"
                    ? "bg-white dark:bg-gray-600 shadow"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => setViewMode("list")}
              >
                لیستی
              </button>
            </div>
          </div>
        </div>
      </div>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 ${
                selectedFiles.includes(file.id) ? "ring-2 ring-primary-500" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                {getFileIcon(file.type)}
                <input
                  type="checkbox"
                  className="ml-2"
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
                className="font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 mb-2 block"
              >
                {file.name}
              </Link>
              <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <p>اندازه: {file.size}</p>
                <p>آپلود: {file.uploadDate}</p>
                {file.meeting && <p>جلسه: {file.meeting}</p>}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {file.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex justify-end space-x-2 space-x-reverse">
                <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  <DocumentDuplicateIcon className="h-5 w-5" />
                </button>
                <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-right">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFiles(files.map((f) => f.id));
                      } else {
                        setSelectedFiles([]);
                      }
                    }}
                  />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  نام فایل
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  نوع
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  اندازه
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  تاریخ آپلود
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  آپلود کننده
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">عملیات</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredFiles.map((file) => (
                <tr key={file.id}>
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getFileIcon(file.type)}
                      <div className="mr-4">
                        <Link
                          to={`/files/${file.id}`}
                          className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {file.name}
                        </Link>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {file.meeting}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {file.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {file.size}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {file.uploadDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {file.uploadedBy}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2 space-x-reverse">
                      <button className="text-primary-600 hover:text-primary-900">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900">
                        <DocumentDuplicateIcon className="h-5 w-5" />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900">
                        <ArrowDownTrayIcon className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Files;
