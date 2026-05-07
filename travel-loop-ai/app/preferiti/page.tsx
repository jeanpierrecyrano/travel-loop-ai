// File: /app/preferiti/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { getFavorites, removeFavorite } from '@/lib/favorites';
import { Trip } from '@/lib/itinerary';
import { CloudSun, Trash2, MapPin, Wallet, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PreferitiPage() {
  const [favorites, setFavorites] = useState<Trip[]>([]);

  // Carichiamo i dati dal localStorage appena la pagina si apre
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (id: string) => {
    removeFavorite(id);
    // Aggiorniamo la UI rimuovendo la card all'istante
    setFavorites(favorites.filter(f => f.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
            I Tuoi Viaggi Salvati
          </h1>
          <p className="text-gray-500 text-lg">
            Hai salvato {favorites.length} {favorites.length === 1 ? 'itinerario' : 'itinerari'}.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white p-12 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 text-center flex flex-col items-center">
            <MapPin className="w-16 h-16 text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Nessun viaggio salvato</h2>
            <p className="text-gray-500 mb-8 max-w-md">Non hai ancora aggiunto nessun itinerario ai preferiti. Inizia a esplorare per creare il tuo prossimo viaggio.</p>
            <Link href="/itinerario" className="bg-[#ea580c] text-white px-8 py-4 rounded-full font-bold hover:bg-orange-500 transition-all shadow-lg hover:shadow-orange-500/30">
              Genera Itinerario
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((trip) => (
              <div key={trip.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                
                {/* Immagine Card */}
                <div className="h-48 relative bg-cover bg-center" style={{ backgroundImage: `url(${trip.immagine})` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full font-semibold text-xs text-white">
                      <CloudSun className="w-3 h-3 text-orange-300"/> {trip.periodoMigliore}
                    </span>
                  </div>
                </div>

                {/* Contenuto Card */}
                <div className="p-6">
                  <h3 className="font-bold text-2xl text-[#0f172a] mb-4">{trip.titolo}</h3>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                      <div className="bg-orange-50 p-2 rounded-lg"><MapPin className="w-4 h-4 text-[#ea580c]"/></div>
                      {trip.giorni.length} Giorni di viaggio
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                      <div className="bg-orange-50 p-2 rounded-lg"><Wallet className="w-4 h-4 text-[#ea580c]"/></div>
                      Budget stimato: € {trip.riepilogoCosti.costoTarget}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => handleRemove(trip.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 flex items-center gap-2 text-sm font-bold"
                    >
                      <Trash2 className="w-4 h-4" /> Rimuovi
                    </button>
                    {/* Al momento questo rimanda a /itinerario (che ne genera uno nuovo), ma in una V2 caricherebbe questo specifico ID */}
                    <Link href="/itinerario" className="text-[#ea580c] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Rigenera <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}