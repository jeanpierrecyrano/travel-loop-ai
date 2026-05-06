"use client";

import { useState, useEffect } from 'react';
import { getItineraryOfTheDay, Trip } from '@/lib/itinerary'; 
import { 
  Download, Wallet, Utensils, Bed, 
  CloudSun, Navigation, Minus, Plus,
  Bookmark, Share2, MapPin, Coffee, Moon,
  Ticket // <- Ho aggiunto la nuova icona del biglietto per gli extra!
} from 'lucide-react';

const HeroSection = ({ trip }: { trip: Trip }) => (
  <div className="h-[60vh] min-h-[400px] relative bg-cover bg-center flex items-end pb-16 px-8 print:h-48" 
       style={{ backgroundImage: `url(${trip.immagine})` }}>
    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent print:hidden" />
    
    <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full font-semibold text-sm text-white mb-6 shadow-lg">
          <CloudSun className="w-4 h-4 text-orange-300"/> {trip.periodoMigliore}
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight drop-shadow-2xl">
          {trip.titolo}
        </h1>
      </div>
      
      <div className="flex items-center gap-3 print:hidden">
        <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-full hover:bg-white/20 hover:scale-105 transition-all shadow-xl">
          <Bookmark className="w-5 h-5" />
        </button>
        <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-full hover:bg-white/20 hover:scale-105 transition-all shadow-xl">
          <Share2 className="w-5 h-5" />
        </button>
        <button onClick={() => window.print()} 
                className="bg-[#ea580c] text-white px-8 py-4 rounded-full flex items-center gap-3 font-bold hover:bg-orange-500 hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] transition-all shrink-0">
          <Download className="w-5 h-5" /> Esporta PDF
        </button>
      </div>
    </div>
  </div>
);

const Sidebar = ({ trip, travelers, setTravelers }: { trip: Trip, travelers: number, setTravelers: any }) => {
  const b = trip.budgetBase;
  const calcola = (val: number) => val * travelers;
  const totale = calcola(b.trasporto.costo + b.cibo.costo + b.attivita.costo) + b.alloggio.costo;

  return (
    <div className="lg:col-span-4 space-y-8 sticky top-28 print:static">
      
      <div className="bg-[#0f172a] text-white p-8 rounded-[2rem] shadow-2xl border border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10" />
        <h3 className="font-bold text-xl mb-6 flex items-center gap-3 border-b border-white/10 pb-5 text-white">
          <span className="bg-[#ea580c] p-2 rounded-xl"><Navigation className="w-5 h-5 text-white" /></span>
          Logistica
        </h3>
        <div className="space-y-6 text-sm">
          <div>
            <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2"><MapPin className="w-3 h-3"/> Partenza</p>
            <p className="text-gray-100 font-medium text-base">{trip.logistica.partenza}</p>
          </div>
          <div>
            <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-2">Parcheggio</p>
            <p className="text-gray-100 font-medium text-base">{trip.logistica.parcheggio}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-xl flex items-center gap-3 text-[#0f172a]">
            <span className="bg-orange-50 p-2 rounded-xl"><Wallet className="text-[#ea580c] w-5 h-5"/></span>
            Budget
          </h3>
          <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-full border border-gray-100 print:hidden">
            <button onClick={() => setTravelers(Math.max(1, travelers - 1))} className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-100 transition-colors"><Minus size={14} className="text-gray-600"/></button>
            <span className="text-sm font-bold w-6 text-center text-[#0f172a]">{travelers}</span>
            <button onClick={() => setTravelers(travelers + 1)} className="w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center shadow-sm hover:bg-gray-800 transition-colors"><Plus size={14}/></button>
          </div>
        </div>
        
        <div className="space-y-5 border-b border-gray-100 pb-8 mb-8">
          {[
            { label: 'Trasporto', val: calcola(b.trasporto.costo), desc: b.trasporto.dettaglio },
            { label: 'Alloggio', val: b.alloggio.costo, desc: b.alloggio.dettaglio },
            { label: 'Cibo', val: calcola(b.cibo.costo), desc: b.cibo.dettaglio },
            { label: 'Attività', val: calcola(b.attivita.costo), desc: b.attivita.dettaglio },
          ].map((item, i) => (
             <div key={i} className="flex flex-col group">
              <div className="flex justify-between items-end font-bold text-sm mb-1">
                <span className="text-gray-600 group-hover:text-[#0f172a] transition-colors">{item.label}</span>
                <span className="text-[#ea580c] font-black text-base">€ {item.val}</span>
              </div>
              <span className="text-xs text-gray-400 font-medium leading-tight">{item.desc}</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Totale stimato</span>
            <span className="text-sm text-gray-500 font-medium">Per {travelers} {travelers === 1 ? 'viaggiatore' : 'viaggiatori'}</span>
          </div>
          <span className="text-4xl font-black text-[#0f172a] tracking-tight">€ {totale}</span>
        </div>
      </div>
    </div>
  );
};

interface ItineraryDayProps {
  giorno: number;
  mattina: string;
  pranzo: string;
  pomeriggio: string;
  sera: string;
}

const ItineraryDay = ({ giorno, mattina, pranzo, pomeriggio, sera }: ItineraryDayProps) => (
  <div className="relative pl-12 md:pl-16 border-l-[3px] border-orange-100 pb-16 last:pb-0">
    <div className="absolute w-12 h-12 bg-gradient-to-br from-[#ea580c] to-orange-400 rounded-full -left-[25.5px] top-0 flex items-center justify-center text-white font-black text-lg shadow-[0_0_20px_rgba(234,88,12,0.3)] ring-4 ring-white">
      {giorno}
    </div>
    
    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100 space-y-8 transition-transform hover:-translate-y-1 duration-300">
      <div>
        <p className="flex items-center gap-2 text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-3">
          <Coffee className="w-4 h-4 text-gray-400" /> Mattina
        </p>
        <p className="text-[#0f172a] text-lg font-medium leading-relaxed">{mattina}</p>
      </div>

      <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100/50">
        <p className="flex items-center gap-2 text-[#ea580c] text-[11px] font-bold uppercase tracking-widest mb-2">
          <Utensils className="w-4 h-4" /> Sosta Pranzo
        </p>
        <p className="text-[#0f172a] font-medium">{pranzo}</p>
      </div>

      <div>
        <p className="flex items-center gap-2 text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-3">
          <MapPin className="w-4 h-4 text-gray-400" /> Pomeriggio
        </p>
        <p className="text-[#0f172a] text-lg font-medium leading-relaxed">{pomeriggio}</p>
      </div>

      <div className="bg-gradient-to-br from-[#0f172a] to-gray-800 p-6 rounded-2xl text-white shadow-lg">
        <p className="flex items-center gap-2 text-orange-400 text-[11px] font-bold uppercase tracking-widest mb-2">
          <Moon className="w-4 h-4" /> L'Anima del luogo (Sera)
        </p>
        <p className="font-medium leading-relaxed">{sera}</p>
      </div>
    </div>
  </div>
);

export default function ItineraryPage() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [travelers, setTravelers] = useState(2);

  useEffect(() => {
    setTrip(getItineraryOfTheDay());
  }, []);

  if (!trip) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#f8fafc]">
      <div className="w-12 h-12 border-4 border-orange-200 border-t-[#ea580c] rounded-full animate-spin" />
      <span className="font-bold text-gray-500 uppercase tracking-widest text-sm">Creazione Loop in corso...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 print:bg-white print:pb-0 selection:bg-[#ea580c] selection:text-white font-sans">
      <HeroSection trip={trip} />

      <main className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 print:block">
        <Sidebar trip={trip} travelers={travelers} setTravelers={setTravelers} />

        <div className="lg:col-span-8 space-y-12">
          
          <section>
            <h2 className="text-4xl font-extrabold text-[#0f172a] mb-12 tracking-tight">Il Tuo Programma</h2>
            <div className="mt-8 pt-4">
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
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40">
              <h3 className="font-bold text-2xl text-[#0f172a] mb-8 flex items-center gap-3">
                <span className="bg-orange-50 p-2 rounded-xl"><Utensils className="text-[#ea580c] w-6 h-6"/></span>
                Gastronomia
              </h3>
              <div className="space-y-6">
                {trip.mangiare.map((m, i) => (
                  <div key={i} className="group border-l-[3px] border-orange-100 pl-5 py-1 hover:border-[#ea580c] transition-colors">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">{m.tipo}</p>
                    <p className="font-bold text-lg text-[#0f172a] mb-1">{m.nome}</p>
                    <p className="text-sm text-gray-500 font-medium">{m.piatto}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40">
              <h3 className="font-bold text-2xl text-[#0f172a] mb-8 flex items-center gap-3">
                <span className="bg-orange-50 p-2 rounded-xl"><Bed className="text-[#ea580c] w-6 h-6"/></span>
                Dove Dormire
              </h3>
              <div className="space-y-6">
                {trip.alloggi.map((h, i) => (
                  <div key={i} className="group border-l-[3px] border-orange-100 pl-5 py-1 hover:border-[#ea580c] transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-lg text-[#0f172a]">{h.nome}</p>
                      <span className="bg-gray-100 text-[#ea580c] px-2 py-1 rounded-md font-black text-[10px] tracking-widest">{h.fascia}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-2">{h.tipo}</p>
                    <p className="text-sm text-gray-500 font-medium italic">“{h.pro}”</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ECCO LA NUOVA SEZIONE CHE LEGGE IL DATO "EXTRA" */}
          <section className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 mt-8">
            <h3 className="font-bold text-2xl text-[#0f172a] mb-8 flex items-center gap-3">
              <span className="bg-orange-50 p-2 rounded-xl"><Ticket className="text-[#ea580c] w-6 h-6"/></span>
              Esperienze Extra Suggerite
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {trip.extra.map((ext, i) => (
                <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:border-[#ea580c] hover:bg-white transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-[#0f172a] text-lg leading-tight group-hover:text-[#ea580c] transition-colors">{ext.nome}</h4>
                    <span className="bg-[#0f172a] text-white px-3 py-1 rounded-lg font-black text-sm shrink-0">€ {ext.costo}</span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{ext.descrizione}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}