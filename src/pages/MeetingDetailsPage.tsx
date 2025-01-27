import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MeetingDetails from "../components/meetings/MeetingDetails";
import CreateMeetingModal from "../components/meetings/CreateMeetingModal";
import Resolutions from "../components/meetings/Resolutions";
import { Meeting } from '../types/meeting';

const MOCK_MEETING: Meeting = {
  id: 1,
  title: "جلسه برنامه‌ریزی پروژه جدید",
  date: new Date(2025, 0, 30),
  time: "10:00",
  duration: 60,
  status: "scheduled",
  description:
    "در این جلسه به بررسی نیازمندی‌های پروژه جدید و برنامه‌ریزی زمان‌بندی آن خواهیم پرداخت.",
  location: "اتاق جلسات اصلی",
  participants: [
    {
      id: 1,
      name: "علی محمدی",
      role: "مدیر پروژه",
      email: "ali@example.com",
      department: "مدیریت پروژه",
      attendance: 'present'
    },
    {
      id: 2,
      name: "سارا احمدی",
      role: "تحلیلگر",
      email: "sara@example.com",
      department: "تحلیل و طراحی",
      attendance: 'present'
    },
    {
      id: 3,
      name: "رضا کریمی",
      role: "برنامه‌نویس ارشد",
      email: "reza@example.com",
      department: "توسعه نرم‌افزار",
      attendance: 'present'
    },
    {
      id: 4,
      name: "مریم حسینی",
      role: "طراح رابط کاربری",
      email: "maryam@example.com",
      department: "طراحی",
      attendance: 'pending'
    }
  ],
  agenda: [
    "معرفی اهداف پروژه",
    "بررسی نیازمندی‌های فنی",
    "تخمین زمان و هزینه",
    "تقسیم وظایف اولیه",
  ],
  attachments: [
    {
      id: 1,
      name: "پیش‌نویس پروپوزال.pdf",
      type: "pdf",
      size: "2.5 MB",
    },
    {
      id: 2,
      name: "نمودار گانت.xlsx",
      type: "excel",
      size: "1.8 MB",
    },
  ],
  resolutions: [
    {
      id: 1,
      title: "تهیه مستندات فنی",
      description: "آماده‌سازی مستندات فنی و نیازمندی‌های پروژه",
      assignee: "سارا احمدی",
      dueDate: new Date(2025, 1, 15),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: "راه‌اندازی محیط توسعه",
      description: "نصب و پیکربندی ابزارهای مورد نیاز",
      assignee: "رضا کریمی",
      dueDate: new Date(2025, 1, 10),
      status: 'completed',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
};

const MeetingDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [meeting] = useState(MOCK_MEETING); // در پروژه واقعی از API فراخوانی می‌شود

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    if (window.confirm("آیا از حذف این جلسه اطمینان دارید؟")) {
      // در پروژه واقعی درخواست حذف به API ارسال می‌شود
      console.log("Deleting meeting:", id);
      navigate("/meetings");
    }
  };

  const handleUpdate = (data: any) => {
    // در پروژه واقعی درخواست به‌روزرسانی به API ارسال می‌شود
    console.log("Updating meeting:", id, data);
    setShowEditModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <button
          onClick={() => navigate("/meetings")}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          ← بازگشت به لیست جلسات
        </button>
      </div>

      <MeetingDetails
        meeting={meeting}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CreateMeetingModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleUpdate}
        initialData={meeting}
      />
      <div className="mt-8">
        <Resolutions
          meetingId={meeting.id}
          resolutions={meeting.resolutions || []}
          onAddResolution={(newResolution) => {
            // در اینجا باید با API ارتباط برقرار کنید
            console.log("Adding new resolution:", newResolution);
          }}
          onUpdateResolution={(id, resolution) => {
            // در اینجا باید با API ارتباط برقرار کنید
            console.log("Updating resolution:", id, resolution);
          }}
          onDeleteResolution={(id) => {
            // در اینجا باید با API ارتباط برقرار کنید
            console.log("Deleting resolution:", id);
          }}
        />
      </div>
    </div>
  );
};

export default MeetingDetailsPage;
