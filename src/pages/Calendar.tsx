import { useState } from 'react';
import MeetingsCalendar from '../components/meetings/MeetingsCalendar';
import CreateMeetingModal from '../components/meetings/CreateMeetingModal';
import { DateSelectArg } from '@fullcalendar/core';
import { motion } from 'framer-motion';

const MOCK_MEETINGS = [
  {
    id: 1,
    title: 'جلسه برنامه‌ریزی پروژه',
    start: new Date(2025, 0, 28, 10, 0),
    end: new Date(2025, 0, 28, 11, 30),
    location: 'اتاق جلسات اصلی',
    participants: ['علی محمدی', 'سارا احمدی'],
    color: '#818cf8' // ایندیگو
  },
  {
    id: 2,
    title: 'بررسی گزارش ماهانه',
    start: new Date(2025, 0, 29, 14, 0),
    end: new Date(2025, 0, 29, 15, 0),
    location: 'اتاق کنفرانس',
    participants: ['مریم حسینی', 'رضا کریمی'],
    color: '#a78bfa' // بنفش
  }
];

const CalendarPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<DateSelectArg | null>(null);

  const handleEventClick = (meeting: any) => {
    console.log('Clicked meeting:', meeting);
  };

  const handleSelectSlot = (info: DateSelectArg) => {
    setSelectedSlot(info);
    setShowCreateModal(true);
  };

  const handleCreateMeeting = (data: any) => {
    console.log('New meeting data:', {
      ...data,
      start: selectedSlot?.start,
      end: selectedSlot?.end
    });
    setShowCreateModal(false);
    setSelectedSlot(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
        >
          تقویم جلسات
        </motion.h1>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg 
          shadow-lg shadow-indigo-500/30 hover:shadow-purple-500/40 transition-all duration-300"
          onClick={() => setShowCreateModal(true)}
        >
          جلسه جدید
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800"
      >
        <MeetingsCalendar
          meetings={MOCK_MEETINGS}
          onEventClick={handleEventClick}
          onSelectSlot={handleSelectSlot}
        />
      </motion.div>

      <CreateMeetingModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setSelectedSlot(null);
        }}
        onSubmit={handleCreateMeeting}
      />
    </motion.div>
  );
};

export default CalendarPage;