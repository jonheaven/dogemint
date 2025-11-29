import React from 'react';

export default function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 rounded shadow-lg z-50 animate-fade-in">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white font-bold">×</button>
    </div>
  );
}
