import React, { useEffect, useState } from "react";
import type { Event } from "../components/types";

interface MonthViewProps {
    date: Date;
    onEventClick: (event: Event) => void;
  }
  
  const MonthView: React.FC<MonthViewProps> = ({ date, onEventClick }) => {
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
            `http://localhost:8000/api/v1/events?view=month&date=${formattedDate}`
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
    }, [date]); // ✅ refetch when month changes
  

  if (loading) return <div className="p-4 text-gray-500">Loading events...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  // ✅ Generate 35 cells (5 weeks × 7 days) as a simple grid
  const days = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200 text-sm rounded-lg overflow-hidden">
      {days.map((day) => (
        <div key={day} className="bg-white h-32 p-2 relative">
          <div className="text-xs text-gray-500">{day}</div>
          <div className="mt-1 flex flex-col gap-1">
            {events
              .filter((e) => new Date(e.start_time).getDate() === day)
              .map((e) => (
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
