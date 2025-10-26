import React, { useState } from 'react';
import type { Event } from '../components/types';

interface MonthViewProps {
  onEventClick: (event: Event) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ onEventClick }) => {
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Team Meeting',
      start: '2025-10-24T10:00:00',
      end: '2025-10-24T11:00:00',
    },
    {
      id: '2',
      title: 'Dinner with Friends',
      start: '2025-10-26T19:00:00',
      end: '2025-10-26T21:00:00',
    },
  ]);

  const days = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200 text-sm rounded-lg overflow-hidden">
      {days.map((day) => (
        <div key={day} className="bg-white h-32 p-2 relative">
          <div className="text-xs text-gray-500">{day}</div>
          <div className="mt-1 flex flex-col gap-1">
            {events
              .filter(e => new Date(e.start).getDate() === day)
              .map(e => (
                <button
                  key={e.id}
                  onClick={() => onEventClick(e)}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 truncate"
                >
                  {e.title}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MonthView;
