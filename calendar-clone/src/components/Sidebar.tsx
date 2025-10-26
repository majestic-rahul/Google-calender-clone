import React from "react";
import { CalendarDays, Plus, ChevronDown } from "lucide-react";

interface SidebarProps {
  handleCreate: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleCreate }) => {
  return (
    <aside className="w-64 border-r bg-white p-4 flex flex-col gap-6">
      {/* Create button */}
      <button
        onClick={handleCreate}
        className="flex items-center justify-center gap-2 border border-gray-300 rounded-full bg-white px-5 py-2 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all w-[50%]"
        style={{padding:"12px"}}
      >
        <Plus className="w-4 h-4 text-gray-800" />
        <span className="font-medium text-gray-800">Create</span>
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </button>

      {/* My Calendars Section */}
      <div className="flex items-center gap-2 text-blue-600 font-semibold text-lg mt-4">
        <CalendarDays className="w-5 h-5" /> My Calendars
      </div>

      <div className="flex flex-col gap-2 text-gray-700 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" defaultChecked className="accent-blue-500" />
          Work
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" defaultChecked className="accent-blue-500" />
          Personal
        </label>
      </div>
    </aside>
  );
};

export default Sidebar;
