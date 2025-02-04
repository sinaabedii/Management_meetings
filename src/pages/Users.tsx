import { useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import UserModal from "../components/users/UserModal";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  phone: string;
  status: "active" | "inactive";
  avatar: string;
  lastActive: string;
  meetingsAttended: number;
  meetingsOrganized: number;
  completedTasks: number;
}


const MOCK_USERS: User[] = [
  {
    id: 1,
    name: "علی محمدی",
    email: "ali@example.com",
    role: "مدیر پروژه",
    department: "مدیریت",
    phone: "0912-345-6789",
    status: "active",
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=علی محمدی`,
    lastActive: "10 دقیقه پیش",
    meetingsAttended: 45,
    meetingsOrganized: 12,
    completedTasks: 89,
  },
  {
    id: 2,
    name: "سارا احمدی",
    email: "sara@example.com",
    role: "توسعه‌دهنده ارشد",
    department: "فنی",
    phone: "0912-345-6790",
    status: "active",
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=سارا احمدی`,
    lastActive: "2 ساعت پیش",
    meetingsAttended: 38,
    meetingsOrganized: 5,
    completedTasks: 67,
  },
];

const Users = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortField, setSortField] = useState<keyof User>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddEdit = (data: any) => {
    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...data } : user
        )
      );
    } else {
      const newUser = {
        id: users.length + 1,
        ...data,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${data.name}`,
        lastActive: "هم اکنون",
        meetingsAttended: 0,
        meetingsOrganized: 0,
        completedTasks: 0,
      };
      setUsers([...users, newUser]);
    }
    setShowModal(false);
    setEditingUser(null);
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (user) =>
        selectedDepartment === "all" || user.department === selectedDepartment
    )
    .filter(
      (user) => selectedStatus === "all" || user.status === selectedStatus
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : 1;
      }
      return aValue > bValue ? -1 : 1;
    });

  return (
    <div className="container mx-auto px-6 ">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-6"
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          مدیریت کاربران
        </h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setEditingUser(null);
            setShowModal(true);
          }}
          className="px-2 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl
          shadow-lg shadow-purple-500/30 hover:shadow-blue-500/40 transition-all duration-300
          flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          افزودن کاربر جدید
        </motion.button>
      </motion.div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl 
        border border-gray-200/30 dark:border-gray-700/30 shadow-lg p-6 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو..."
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
              value={selectedDepartment}
              dir="ltr"
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="all">همه دپارتمان‌ها</option>
              <option value="مدیریت">مدیریت</option>
              <option value="فنی">فنی</option>
              <option value="طراحی">طراحی</option>
              <option value="مارکتینگ">مارکتینگ</option>
            </select>
          </div>
          <div>
            <select
              className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
              backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30
              focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
              value={selectedStatus}
              dir="ltr"
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="active">فعال</option>
              <option value="inactive">غیرفعال</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={user.id}
            className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl 
            border border-gray-200/30 dark:border-gray-700/30 shadow-lg
            hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300
            relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 to-blue-500/50 
            transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
            
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-12 w-12 rounded-full ring-2 ring-purple-500/20"
                  />
                  <div className="mr-4">
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 
                    bg-clip-text text-transparent">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.role}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.status === "active"
                      ? "bg-green-100/80 text-green-800 dark:bg-green-900/80 dark:text-green-300"
                      : "bg-red-100/80 text-red-800 dark:bg-red-900/80 dark:text-red-300"
                  }`}
                >
                  {user.status === "active" ? "فعال" : "غیرفعال"}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 
                dark:hover:text-purple-400 transition-colors duration-300">
                  <EnvelopeIcon className="h-5 w-5 ml-2" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 
                dark:hover:text-purple-400 transition-colors duration-300">
                  <PhoneIcon className="h-5 w-5 ml-2" />
                  <span className="text-sm">{user.phone}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 
                dark:hover:text-purple-400 transition-colors duration-300">
                  <BuildingOfficeIcon className="h-5 w-5 ml-2" />
                  <span className="text-sm">{user.department}</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4 border-t border-gray-200/30 dark:border-gray-700/30 pt-4">
                <div className="text-center group">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    جلسات
                  </p>
                  <p className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 
                  bg-clip-text text-transparent">
                    {user.meetingsAttended}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    برگزار شده
                  </p>
                  <p className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 
                  bg-clip-text text-transparent">
                    {user.meetingsOrganized}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    وظایف
                  </p>
                  <p className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 
                  bg-clip-text text-transparent">
                    {user.completedTasks}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  آخرین فعالیت: {user.lastActive}
                </span>
                <div className="flex gap-4">
                  <button
                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400 
                    dark:hover:text-purple-300 transition-colors duration-300 text-sm font-medium"
                    onClick={() => {
                      setEditingUser(user);
                      setShowModal(true);
                    }}
                  >
                    ویرایش
                  </button>
                  <button 
                    onClick={() => navigate(`/users/${user.id}`)} 
                    className="text-blue-600 w-28 hover:text-blue-700 dark:text-blue-400 
                    dark:hover:text-blue-300 transition-colors duration-300 text-sm font-medium"
                  >
                    مشاهده پروفایل
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <UserModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingUser(null);
        }}
        onSubmit={handleAddEdit}
        editUser={editingUser || undefined}
      />
    </div>
  );
};

export default Users;
