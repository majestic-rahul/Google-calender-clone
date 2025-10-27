import React, { useEffect, useState } from "react";
import type { Event } from "../components/types";

interface DayViewProps {
  date: Date; // ✅ receive date from parent
  onEventClick: (event: Event) => void;
}

const hours = Array.from({ length: 24 }, (_, i) => i); // 0–23 hours

const DayView: React.FC<DayViewProps> = ({ date, onEventClick }) => {
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
          `http://localhost:8000/api/v1/events?view=day&date=${formattedDate}`,
          {
            headers: { Accept: "application/json" },
          }
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
    <div className="border-t border-l">
      {hours.map((hour) => (
        <div key={hour} className="border-b relative h-16 px-2 flex items-center">
          <div className="w-12 text-gray-500 text-sm">{hour}:00</div>
          <div className="flex-1 relative">
            {events
              .filter((e) => new Date(e.start_time).getHours() === hour)
              .map((e) => (
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
