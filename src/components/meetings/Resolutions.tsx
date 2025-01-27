import React, { useState } from "react";
import { format } from "date-fns";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

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

  const getStatusColor = (status: Resolution["status"]) => {
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
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          مصوبات جلسه
        </h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 ml-2" />
          افزودن مصوبه
        </button>
      </div>

      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                عنوان
              </label>
              <input
                type="text"
                className="input-primary"
                value={newResolution.title}
                onChange={(e) =>
                  setNewResolution({ ...newResolution, title: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                مسئول پیگیری
              </label>
              <input
                type="text"
                className="input-primary"
                value={newResolution.assignee}
                onChange={(e) =>
                  setNewResolution({
                    ...newResolution,
                    assignee: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                مهلت انجام
              </label>
              <input
                type="date"
                className="input-primary"
                value={format(newResolution.dueDate, "yyyy-MM-dd")}
                onChange={(e) =>
                  setNewResolution({
                    ...newResolution,
                    dueDate: new Date(e.target.value),
                  })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                وضعیت
              </label>
              <select
                className="input-primary"
                value={newResolution.status}
                onChange={(e) =>
                  setNewResolution({
                    ...newResolution,
                    status: e.target.value as Resolution["status"],
                  })
                }
              >
                <option value="pending">در حال انجام</option>
                <option value="completed">انجام شده</option>
                <option value="overdue">تاخیر در انجام</option>
                <option value="cancelled">لغو شده</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              توضیحات
            </label>
            <textarea
              className="input-primary"
              rows={3}
              value={newResolution.description}
              onChange={(e) =>
                setNewResolution({
                  ...newResolution,
                  description: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mt-4 flex justify-end space-x-4 space-x-reverse">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
              }}
            >
              انصراف
            </button>
            <button type="submit" className="btn-primary">
              {editingId !== null ? "ویرایش" : "افزودن"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {resolutions.map((resolution) => (
          <div
            key={resolution.id}
            className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4"
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
              <div className="flex items-center space-x-2 space-x-reverse">
                <button
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
                  className="text-blue-600 hover:text-blue-800"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDeleteResolution(resolution.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
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
              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                  resolution.status
                )}`}
              >
                {getStatusText(resolution.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resolutions;
