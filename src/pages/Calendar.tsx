import React, { useState } from 'react';
import MeetingsCalendar from '../components/meetings/MeetingsCalendar';
import CreateMeetingModal from '../components/meetings/CreateMeetingModal';
import { DateSelectArg } from '@fullcalendar/core';

// Mock data
const MOCK_MEETINGS = [
  {
    id: 1,
    title: 'جلسه برنامه‌ریزی پروژه',
    start: new Date(2025, 0, 28, 10, 0),
    end: new Date(2025, 0, 28, 11, 30),
    location: 'اتاق جلسات اصلی',
    participants: ['علی محمدی', 'سارا احمدی']
  },
  {
    id: 2,
    title: 'بررسی گزارش ماهانه',
    start: new Date(2025, 0, 29, 14, 0),
    end: new Date(2025, 0, 29, 15, 0),
    location: 'اتاق کنفرانس',
    participants: ['مریم حسینی', 'رضا کریمی']
  }
];

const CalendarPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<DateSelectArg | null>(null);

  const handleEventClick = (meeting: any) => {
    console.log('Clicked meeting:', meeting);
    // اینجا می‌تونیم مودال جزئیات جلسه رو نمایش بدیم
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
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">تقویم جلسات</h1>
      </div>

      <MeetingsCalendar
        meetings={MOCK_MEETINGS}
        onEventClick={handleEventClick}
        onSelectSlot={handleSelectSlot}
      />

      <CreateMeetingModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setSelectedSlot(null);
        }}
        onSubmit={handleCreateMeeting}
      />
    </div>
  );
};

export default CalendarPage;