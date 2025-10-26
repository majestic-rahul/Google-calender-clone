import React, { useState } from 'react';
import type { Event } from '../components/types';

interface DayViewProps {
  onEventClick: (event: Event) => void;
}

const hours = Array.from({ length: 24 }, (_, i) => i); // 0-23 hours

const DayView: React.FC<DayViewProps> = ({ onEventClick }) => {
  const [events] = useState<Event[]>([
    { id: '1', title: 'Morning Run', start: '2025-10-24T06:00:00', end: '2025-10-24T07:00:00' },
    { id: '2', title: 'Meeting', start: '2025-10-24T10:00:00', end: '2025-10-24T11:00:00' },
  ]);

  return (
    <div className="border-t border-l">
      {hours.map(hour => (
        <div key={hour} className="border-b relative h-16 px-2 flex items-center">
          <div className="w-12 text-gray-500 text-sm">{hour}:00</div>
          <div className="flex-1 relative">
            {events
              .filter(e => new Date(e.start).getHours() === hour)
              .map(e => (
                <button
                  key={e.id}
                  onClick={() => onEventClick(e)}
                  className="absolute top-1 left-0 right-0 bg-blue-100 text-blue-800 text-xs rounded px-1 py-0.5 hover:bg-blue-200"
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

export default DayView;
