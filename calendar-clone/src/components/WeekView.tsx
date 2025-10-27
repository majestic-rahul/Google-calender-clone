import React, { useEffect, useState } from "react";
import type { Event } from "../components/types";

interface WeekViewProps {
  date: Date; // ✅ receive date from parent
  onEventClick: (event: Event) => void;
}

const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8AM - 7PM
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeekView: React.FC<WeekViewProps> = ({ date, onEventClick }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const formattedDate = date.toISOString().split("T")[0];

        const res = await fetch(
          `http://localhost:8000/api/v1/events?view=week&date=${formattedDate}`,
          { headers: { Accept: "application/json" } }
        );

        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const data = await res.json();
        setEvents(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [date]); // ✅ refetch when date changes

  if (loading) return <div className="p-4 text-gray-500">Loading events...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="grid grid-cols-8 border-t border-l">
      {/* Day headers */}
      <div className="border-r border-b p-2 bg-gray-50"></div>
      {days.map((day) => (
        <div
          key={day}
          className="border-r border-b p-2 bg-gray-50 text-center font-semibold"
        >
          {day}
        </div>
      ))}

      {/* Time slots */}
      {hours.map((hour) => (
        <React.Fragment key={hour}>
          <div className="border-r border-b p-2 text-gray-500 text-sm">{hour}:00</div>
          {days.map((day, dayIndex) => (
            <div key={`${day}-${hour}`} className="border-r border-b relative h-16">
              {events
                .filter((e) => {
                  const eventDate = new Date(e.start_time);
                  return eventDate.getDay() === dayIndex && eventDate.getHours() === hour;
                })
                .map((e) => (
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
        </React.Fragment>
      ))}
    </div>
  );
};

export default WeekView;
