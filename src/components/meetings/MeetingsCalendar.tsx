import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventClickArg, DateSelectArg } from '@fullcalendar/core';

interface Meeting {
  id: number;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  participants?: string[];
}

interface MeetingsCalendarProps {
  meetings: Meeting[];
  onEventClick: (meeting: Meeting) => void;
  onSelectSlot: (info: DateSelectArg) => void;
}

const MeetingsCalendar: React.FC<MeetingsCalendarProps> = ({
  meetings,
  onEventClick,
  onSelectSlot,
}) => {
  const handleEventClick = (clickInfo: EventClickArg) => {
    const meeting = meetings.find(m => m.id === parseInt(clickInfo.event.id));
    if (meeting) {
      onEventClick(meeting);
    }
  };

  return (
    <div className="h-screen p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        locale="fa"
        direction="rtl"
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={meetings.map(meeting => ({
          id: meeting.id.toString(),
          title: meeting.title,
          start: meeting.start,
          end: meeting.end,
          location: meeting.location,
          extendedProps: {
            participants: meeting.participants
          }
        }))}
        eventClick={handleEventClick}
        select={onSelectSlot}
        eventContent={(eventInfo) => (
          <div className="p-1">
            <div className="font-bold">{eventInfo.event.title}</div>
            {eventInfo.event.extendedProps.location && (
              <div className="text-xs">{eventInfo.event.extendedProps.location}</div>
            )}
          </div>
        )}
        eventClassNames="cursor-pointer hover:opacity-75"
      />
    </div>
  );
};

export default MeetingsCalendar;