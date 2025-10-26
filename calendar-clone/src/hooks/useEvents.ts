import { useEffect, useState } from "react";
import { fetchEvents } from "../api/events";
import { formatISO } from "date-fns";

export function useEvents(rangeStart: Date, rangeEnd: Date) {
  const [events, setEvents] = useState<any[]>([]);
  useEffect(() => {
    const start = formatISO(rangeStart, { representation: "date" });
    const end = formatISO(rangeEnd, { representation: "date" });
    fetchEvents(start, end)
      .then(setEvents)
      .catch(() => {
         console.error("Failed to fetch events");
      });
  }, [rangeStart, rangeEnd]);
  return { events, setEvents };
}
