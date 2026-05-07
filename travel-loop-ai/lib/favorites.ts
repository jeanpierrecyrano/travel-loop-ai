// File: /lib/favorites.ts
import { Trip } from './itinerary';

// Funzione helper per ottenere la chiave di storage legata all'utente
const getStorageKey = () => {
  if (typeof window === 'undefined') return 'travelloop_favs_guest';
  const session = localStorage.getItem('travelloop_session');
  if (session) {
    const user = JSON.parse(session);
    return `travelloop_favs_${user.id}`;
  }
  return 'travelloop_favs_guest';
};

export const getFavorites = (): Trip[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(getStorageKey());
  return data ? JSON.parse(data) : [];
};

export const addFavorite = (trip: Trip) => {
  const favs = getFavorites();
  if (!favs.find(f => f.id === trip.id)) {
    favs.push(trip);
    localStorage.setItem(getStorageKey(), JSON.stringify(favs));
  }
};

export const removeFavorite = (tripId: string) => {
  let favs = getFavorites();
  favs = favs.filter(f => f.id !== tripId);
  localStorage.setItem(getStorageKey(), JSON.stringify(favs));
};

export const isFavorite = (tripId: string): boolean => {
  const favs = getFavorites();
  return favs.some(f => f.id === tripId);
};