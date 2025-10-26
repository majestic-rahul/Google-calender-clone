import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MonthView from "../components/MonthView";
import EventModal from "../components/EventModal";
import type { Event } from "../components/types";
import WeekView from "../components/WeekView";
import DayView from "../components/DailyView";

export default function CalendarPage() {
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showModal, setShowModal] = useState(false);
  const handleCreate = () => {
     console.log("Create new event");
    setSelectedEvent(null);
    setShowModal(true);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header view={view} setView={setView} />
      <div className="flex flex-1">
        <Sidebar handleCreate={handleCreate} />
        <main className="flex-1 p-6">
          {view === "month" && (
            <MonthView
              onEventClick={(e) => {
                setSelectedEvent(e);
                setShowModal(true);
              }}
            />
          )}
          {view === "week" && (
            <WeekView
              onEventClick={(e) => {
                setSelectedEvent(e);
                setShowModal(true);
              }}
            />
          )}
          {view === "day" && (
            <DayView
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
          onSaved={() => {
            setShowModal(false); /* refresh events */
          }}
        />
      )}
    </div>
  );
}
