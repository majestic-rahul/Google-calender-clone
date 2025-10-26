import React, { useState } from 'react';
import type { Event } from '../components/types';

interface WeekViewProps {
  onEventClick: (event: Event) => void;
}

const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8AM - 7PM
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const WeekView: React.FC<WeekViewProps> = ({ onEventClick }) => {
  const [events] = useState<Event[]>([
    { id: '1', title: 'Team Meeting', start: '2025-10-23T10:00:00', end: '2025-10-23T11:00:00' },
    { id: '2', title: 'Lunch', start: '2025-10-24T13:00:00', end: '2025-10-24T14:00:00' },
  ]);

  return (
    <div className="grid grid-cols-8 border-t border-l">
      {/* Day headers */}
      <div className="border-r border-b p-2 bg-gray-50"></div>
      {days.map(day => (
        <div key={day} className="border-r border-b p-2 bg-gray-50 text-center font-semibold">{day}</div>
      ))}

      {/* Time slots */}
      {hours.map(hour => (
        <>
          <div key={`time-${hour}`} className="border-r border-b p-2 text-gray-500 text-sm">
            {hour}:00
          </div>
          {days.map(day => (
            <div key={`${day}-${hour}`} className="border-r border-b relative h-16">
              {events
                .filter(e => {
                  const d = new Date(e.start);
                  return d.getDay() === days.indexOf(day) && d.getHours() === hour;
                })
                .map(e => (
                  <button
                    key={e.id}
                    onClick={() => onEventClick(e)}
                    className="absolute top-1 left-1 right-1 bg-blue-100 text-blue-800 text-xs rounded px-1 py-0.5 hover:bg-blue-200"
                  >
                    {e.title}
                  </button>
                ))}
            </div>
          ))}
        </>
      ))}
    </div>
  );
};

export default WeekView;
