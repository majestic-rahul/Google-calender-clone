import React, { useState } from 'react';
import type { Event } from '../components/types';

interface EventModalProps {
  event: Event | null;
  onClose: () => void;
  onSaved: (event: Event) => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose, onSaved }) => {
  const [title, setTitle] = useState(event?.title || '');
  const [start, setStart] = useState(event?.start || '');
  const [end, setEnd] = useState(event?.end || '');

  const handleSave = () => {
    onSaved({
      id: event?.id || Date.now().toString(),
      title,
      start,
      end,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 space-y-4">
        <h2 className="text-lg font-semibold">{event ? 'Edit Event' : 'New Event'}</h2>
        <input
          type="text"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <div className="flex gap-2">
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-1/2 border p-2 rounded"
          />
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-1/2 border p-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
