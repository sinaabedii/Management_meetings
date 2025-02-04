import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventClickArg, DateSelectArg } from '@fullcalendar/core';
import '../../styles/calendar-styles.css';

interface Meeting {
  id: number;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  participants?: string[];
  color?: string;
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
    <div className="calendar-container">
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
          backgroundColor: meeting.color || '#818cf8',
          borderColor: meeting.color || '#818cf8',
          extendedProps: {
            participants: meeting.participants
          }
        }))}
        eventClick={handleEventClick}
        select={onSelectSlot}
        eventContent={(eventInfo) => (
          <div className="event-content">
            <div className="event-title">{eventInfo.event.title}</div>
            {eventInfo.event.extendedProps.location && (
              <div className="event-location">
                <span className="location-icon">📍</span>
                {eventInfo.event.extendedProps.location}
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default MeetingsCalendar;