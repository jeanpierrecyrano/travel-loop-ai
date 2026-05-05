"use client";

import { useState, useEffect } from 'react';
import { getItineraryOfTheDay, Trip } from '@/lib/itinerary'; 
import { 
  Download, Wallet, Utensils, Bed, 
  CloudSun, Navigation, Minus, Plus 
} from 'lucide-react';

// --- 1. SOTTO-COMPONENTI MODULARI ---

const HeroSection = ({ trip }: { trip: Trip }) => (
  <div className="h-[55vh] relative bg-cover bg-center flex items-end pb-12 px-8 print:h-48" 
       style={{ backgroundImage: `url(${trip.immagine})` }}>
    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent print:hidden" />
    <div className="relative z-10 text-white max-w-6xl mx-auto w-full flex justify-between items-end">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter drop-shadow-xl">{trip.titolo}</h1>
        <span className="bg-[#ea580c] px-4 py-1 rounded-full font-bold text-xs flex items-center gap-2 w-fit">
          <CloudSun className="w-4 h-4"/> {trip.periodoMigliore}
        </span>
      </div>
      <button onClick={() => window.print()} 
              className="print:hidden bg-white text-[#0f172a] px-6 py-3 rounded-full flex items-center gap-2 font-bold hover:bg-[#ea580c] hover:text-white transition-all shadow-2xl shrink-0">
        <Download className="w-5 h-5" /> Esporta PDF
      </button>
    </div>
  </div>
);

const Sidebar = ({ trip, travelers, setTravelers }: { trip: Trip, travelers: number, setTravelers: any }) => {
  const b = trip.budgetBase;
  const calcola = (val: number) => val * travelers;
  const totale = calcola(b.trasporto.costo + b.cibo.costo + b.attivita.costo) + b.alloggio.costo;

  return (
    <div className="lg:col-span-4 space-y-8">
      {/* Box Logistica */}
      <div className="bg-[#0f172a] text-white p-8 rounded-3xl shadow-2xl">
        <h3 className="font-bold text-xl mb-6 flex items-center gap-2 border-b border-white/10 pb-4 text-[#ea580c]">
          <Navigation /> Logistica
        </h3>
        <div className="space-y-4 text-sm">
          <div><p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Partenza</p><p>{trip.logistica.partenza}</p></div>
          <div><p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Parcheggio</p><p>{trip.logistica.parcheggio}</p></div>
        </div>
      </div>

      {/* Box Budget */}
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-xl flex items-center gap-2 text-[#0f172a]"><Wallet className="text-[#ea580c]"/> Budget</h3>
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full print:hidden">
            <button onClick={() => setTravelers(Math.max(1, travelers - 1))} className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm"><Minus size={14}/></button>
            <span className="text-xs font-bold w-4 text-center">{travelers}</span>
            <button onClick={() => setTravelers(travelers + 1)} className="w-7 h-7 rounded-full bg-[#0f172a] text-white flex items-center justify-center shadow-sm"><Plus size={14}/></button>
          </div>
        </div>
        <div className="space-y-4 border-b pb-6 mb-6">
          {[
            { label: 'Trasporto', val: calcola(b.trasporto.costo), desc: b.trasporto.dettaglio },
            { label: 'Alloggio', val: b.alloggio.costo, desc: b.alloggio.dettaglio },
            { label: 'Cibo', val: calcola(b.cibo.costo), desc: b.cibo.dettaglio },
            { label: 'Attività', val: calcola(b.attivita.costo), desc: b.attivita.dettaglio },
          ].map((item, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex justify-between font-bold text-sm"><span>{item.label}</span><span className="text-[#ea580c]">€ {item.val}</span></div>
              <span className="text-[11px] text-gray-500 leading-tight">{item.desc}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400 font-bold uppercase">Totale x {travelers}</span>
          <span className="text-3xl font-bold text-[#0f172a]">€ {totale}</span>
        </div>
      </div>
    </div>
  );
};

// Il nostro nuovo componente riutilizzabile e pulito
interface ItineraryDayProps {
  giorno: number;
  mattina: string;
  pranzo: string;
  pomeriggio: string;
  sera: string;
}

const ItineraryDay = ({ giorno, mattina, pranzo, pomeriggio, sera }: ItineraryDayProps) => (
  <div className="relative pl-10 border-l-2 border-[#ea580c]/20 pb-12 last:pb-0">
    <div className="absolute w-8 h-8 bg-[#0f172a] rounded-full -left-[17px] top-0 flex items-center justify-center text-white font-bold text-sm shadow-lg">
      {giorno}
    </div>
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 space-y-4">
      <p><strong className="text-[#0f172a] text-[10px] uppercase block tracking-widest mb-1">Mattina</strong> {mattina}</p>
      <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
        <p><strong className="text-[#ea580c] text-[10px] uppercase block tracking-widest mb-1">Sosta Gourmet</strong> {pranzo}</p>
      </div>
      <p><strong className="text-[#0f172a] text-[10px] uppercase block tracking-widest mb-1">Pomeriggio</strong> {pomeriggio}</p>
      <div className="bg-[#0f172a] p-5 rounded-2xl text-white shadow-xl">
        <p><strong className="text-[#ea580c] text-[10px] uppercase block tracking-widest mb-1">L'Anima del luogo (Sera)</strong> {sera}</p>
      </div>
    </div>
  </div>
);

// --- 2. PAGINA PRINCIPALE ---

export default function ItineraryPage() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [travelers, setTravelers] = useState(2);

  useEffect(() => {
    setTrip(getItineraryOfTheDay());
  }, []);

  if (!trip) return (
    <div className="min-h-screen flex items-center justify-center font-bold text-xl text-[#0f172a]">
      Caricamento itinerario...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 print:bg-white print:pb-0">
      <HeroSection trip={trip} />

      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 print:block">
        <Sidebar trip={trip} travelers={travelers} setTravelers={setTravelers} />

        <div className="lg:col-span-8 space-y-12">
          
          <section>
            <h2 className="text-3xl font-bold text-[#0f172a] mb-8 italic">Il Tuo Programma</h2>
            {/* Integrazione elegante del componente */}
            {trip.giorni.map((g, idx) => (
              <ItineraryDay 
                key={idx}
                giorno={g.giorno}
                mattina={g.mattina}
                pranzo={g.pranzo}
                pomeriggio={g.pomeriggio}
                sera={g.sera}
              />
            ))}
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-[#0f172a] mb-6 flex items-center gap-2"><Utensils className="text-[#ea580c]"/> Gastronomia</h3>
              {trip.mangiare.map((m, i) => (
                <div key={i} className="mb-4 last:mb-0 border-l-2 border-gray-100 pl-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{m.tipo}</p>
                  <p className="font-bold text-[#0f172a]">{m.nome}</p>
                  <p className="text-sm text-[#ea580c] italic">{m.piatto}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-[#0f172a] mb-6 flex items-center gap-2"><Bed className="text-[#ea580c]"/> Dove Dormire</h3>
              {trip.alloggi.map((h, i) => (
                <div key={i} className="mb-4 last:mb-0 border-l-2 border-gray-100 pl-4">
                  <div className="flex justify-between items-start"><p className="font-bold text-[#0f172a]">{h.nome}</p><span className="text-[#ea580c] font-black text-[10px]">{h.fascia}</span></div>
                  <p className="text-[10px] text-gray-400 uppercase mb-1">{h.tipo}</p>
                  <p className="text-[11px] text-green-700 font-medium font-serif italic">“{h.pro}”</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}