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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!title || !start || !end) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      title,
      description: 'No description', // Optional, adjust as needed
      start_time: new Date(start).toISOString(),
      end_time: new Date(end).toISOString(),
      location: '',
      is_all_day: false,
      guests: [],
    };

    try {
      const response = await fetch('http://localhost:8000/api/v1/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      // Trigger callback to parent
      onSaved({
        id: data.id || Date.now().toString(), // Use backend id if available
        title,
        start,
        end,
      });

      onClose();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 space-y-4">
        <h2 className="text-lg font-semibold">{event ? 'Edit Event' : 'New Event'}</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
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
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
