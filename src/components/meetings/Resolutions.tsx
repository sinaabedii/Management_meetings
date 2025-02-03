import React, { useState } from "react";
import { format } from "date-fns";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from 'framer-motion';
interface Resolution {
  id: number;
  title: string;
  description: string;
  assignee: string;
  dueDate: Date;
  status: "pending" | "completed" | "overdue" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

interface ResolutionsProps {
  meetingId: number;
  resolutions: Resolution[];
  onAddResolution: (
    resolution: Omit<Resolution, "id" | "createdAt" | "updatedAt">
  ) => void;
  onUpdateResolution: (id: number, resolution: Partial<Resolution>) => void;
  onDeleteResolution: (id: number) => void;
}

const Resolutions: React.FC<ResolutionsProps> = ({
  resolutions,
  onAddResolution,
  onUpdateResolution,
  onDeleteResolution,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newResolution, setNewResolution] = useState<
    Omit<Resolution, "id" | "createdAt" | "updatedAt">
  >({
    title: "",
    description: "",
    assignee: "",
    dueDate: new Date(),
    status: "pending",
  });

  const getStatusStyle = (status: Resolution["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: Resolution["status"]) => {
    switch (status) {
      case "completed":
        return "انجام شده";
      case "pending":
        return "در حال انجام";
      case "overdue":
        return "تاخیر در انجام";
      case "cancelled":
        return "لغو شده";
      default:
        return status;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      onUpdateResolution(editingId, newResolution);
      setEditingId(null);
    } else {
      onAddResolution(newResolution);
    }
    setNewResolution({
      title: "",
      description: "",
      assignee: "",
      dueDate: new Date(),
      status: "pending" as Resolution["status"],
    });
    setShowAddForm(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl 
        shadow-lg shadow-purple-500/10 border border-purple-100/20 
        dark:border-purple-900/20 p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 
          to-blue-600 bg-clip-text text-transparent">
          مصوبات جلسه
        </h3>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 
            to-blue-500 text-white rounded-xl shadow-lg shadow-purple-500/20 
            hover:shadow-purple-500/30 transition-all duration-300"
        >
          <PlusIcon className="h-5 w-5 ml-2" />
          افزودن مصوبه
        </motion.button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="mb-6 bg-gradient-to-r from-purple-50/50 to-blue-50/50 
              dark:from-gray-700/50 dark:to-gray-700/50 backdrop-blur-sm p-6 
              rounded-xl border border-purple-100/20 dark:border-purple-900/20 
              shadow-lg shadow-purple-500/5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 
                  dark:text-gray-300 mb-2">
                  عنوان
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl bg-white/80 
                    dark:bg-gray-800/80 backdrop-blur-sm border border-purple-100/20 
                    dark:border-purple-900/20 shadow-sm focus:ring-2 
                    focus:ring-purple-500/20 focus:border-purple-500/20 
                    transition-all duration-300"
                  value={newResolution.title}
                  onChange={(e) => setNewResolution({ ...newResolution, title: e.target.value })}
                  required
                />
              </div>
              {/* سایر فیلدهای فرم با همین استایل */}
            </div>
            <div className="mt-4 flex justify-end space-x-4 space-x-reverse">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-xl 
                  shadow-lg shadow-gray-500/20 hover:shadow-gray-500/30 
                  transition-all duration-300"
              >
                انصراف
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 
                  text-white rounded-xl shadow-lg shadow-purple-500/20 
                  hover:shadow-purple-500/30 transition-all duration-300"
              >
                {editingId !== null ? "ویرایش" : "افزودن"}
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <motion.div 
        layout
        className="space-y-4"
      >
        {resolutions.map((resolution, index) => (
          <motion.div
            key={resolution.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm 
              rounded-xl border border-purple-100/20 dark:border-purple-900/20 
              p-4 hover:shadow-lg hover:shadow-purple-500/10 transition-all 
              duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  {resolution.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {resolution.description}
                </p>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setEditingId(resolution.id);
                    setNewResolution({
                      title: resolution.title,
                      description: resolution.description,
                      assignee: resolution.assignee,
                      dueDate: resolution.dueDate,
                      status: resolution.status,
                    });
                    setShowAddForm(true);
                  }}
                  className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50/50 
                    rounded-lg transition-colors duration-300"
                >
                  <PencilIcon className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDeleteResolution(resolution.id)}
                  className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50/50 
                    rounded-lg transition-colors duration-300"
                >
                  <TrashIcon className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  مسئول: {resolution.assignee}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  مهلت: {format(resolution.dueDate, "yyyy/MM/dd")}
                </span>
              </div>
              <span className={`px-4 py-1.5 rounded-xl text-sm font-medium 
                transition-all duration-300 ${getStatusStyle(resolution.status)}`}>
                {getStatusText(resolution.status)}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Resolutions;
