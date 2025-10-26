import React from 'react';

export default function EventCard({ event, onClick }:{event:any, onClick?:()=>void}){
  return (
    <div onClick={onClick} className="cursor-pointer rounded px-1 py-0.5 text-xs truncate"
         style={{ background: event.color || '#1a73e8', color: '#fff' }}>
      <div className="font-medium">{event.title}</div>
      <div className="opacity-80 text-[11px]">{/* optional time */}</div>
    </div>
  );
}
