// PERCORSO: app/components/SmartButton.tsx
import React from 'react';

type SmartButtonProps = {
  url: string;
  type: 'hotel' | 'flight' | 'restaurant' | 'attraction';
  label?: string;
};

export default function SmartButton({ url, type, label }: SmartButtonProps) {
  // Impostiamo stili e icone in base al tipo di link
  const config = {
    hotel: { color: 'bg-blue-600 hover:bg-blue-700', defaultLabel: 'Vedi su Booking.com', icon: '🏨' },
    flight: { color: 'bg-sky-500 hover:bg-sky-600', defaultLabel: 'Cerca Volo', icon: '✈️' },
    restaurant: { color: 'bg-red-500 hover:bg-red-600', defaultLabel: 'Vedi su Maps', icon: '🍽️' },
    attraction: { color: 'bg-orange-500 hover:bg-orange-600', defaultLabel: 'Prenota Tour', icon: '🎟️' },
  };

  const { color, defaultLabel, icon } = config[type];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${color}`}
    >
      <span>{icon}</span>
      {label || defaultLabel}
    </a>
  );
}