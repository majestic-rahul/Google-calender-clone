import React from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface HeaderProps {
  view: "month" | "week" | "day";
  setView: (view: "month" | "week" | "day") => void;
  currentDate: Date;
  onPrev: () => void;  
  onNext: () => void;
}

const Header: React.FC<HeaderProps> = ({ view, setView, currentDate, onPrev, onNext }) => {

  const getTitle = () => {
    if (view === "day") {
      return currentDate.toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    if (view === "week") {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
    }
    if (view === "month") {
      return currentDate.toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      });
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">Calendar</h1>
        <div className="flex items-center gap-2 ml-6">
          <button onClick={onPrev} className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={onNext} className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight className="w-5 h-5" />
          </button>
          <span className="font-medium text-gray-700 ml-2">{getTitle()}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <select
            value={view}
            onChange={(e) => setView(e.target.value as "month" | "week" | "day")}
            className="appearance-none border border-gray-300 text-gray-800 font-medium rounded-full pl-4 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400 cursor-pointer"
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4 pointer-events-none" />
        </div>
      </div>
    </header>
  );
};

export default Header;
