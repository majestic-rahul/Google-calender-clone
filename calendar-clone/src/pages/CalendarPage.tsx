import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MonthView from "../components/MonthView";
import EventModal from "../components/EventModal";
import type { Event } from "../components/types";
import WeekView from "../components/WeekView";
import DayView from "../components/DailyView";
import { addDays, addWeeks, addMonths } from "date-fns";

export default function CalendarPage() {
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleCreate = () => {
    setSelectedEvent(null);
    setShowModal(true);
  };

  const handlePrev = () => {
    if (view === "month") setCurrentDate(addMonths(currentDate, -1));
    else if (view === "week") setCurrentDate(addWeeks(currentDate, -1));
    else setCurrentDate(addDays(currentDate, -1));
  };

  const handleNext = () => {
    if (view === "month") setCurrentDate(addMonths(currentDate, 1));
    else if (view === "week") setCurrentDate(addWeeks(currentDate, 1));
    else setCurrentDate(addDays(currentDate, 1));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        view={view}
        setView={setView}
        currentDate={currentDate}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <div className="flex flex-1">
        <Sidebar handleCreate={handleCreate} />
        <main className="flex-1 p-6">
          {view === "month" && (
            <MonthView
              date={currentDate}
              onEventClick={(e) => {
                setSelectedEvent(e);
                setShowModal(true);
              }}
            />
          )}
          {view === "week" && (
            <WeekView
              date={currentDate}
              onEventClick={(e) => {
                setSelectedEvent(e);
                setShowModal(true);
              }}
            />
          )}
          {view === "day" && (
            <DayView
              date={currentDate}
              onEventClick={(e) => {
                setSelectedEvent(e);
                setShowModal(true);
              }}
            />
          )}
        </main>
      </div>

      {showModal && (
        <EventModal
          event={selectedEvent}
          onClose={() => setShowModal(false)}
          onSaved={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
