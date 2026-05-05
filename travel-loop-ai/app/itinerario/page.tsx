"use client";

import { useState, useEffect } from 'react';
import { getDailyItinerary } from '@/lib/engine';
import { Download, Wallet, Utensils, Bed, CloudSun, Navigation, Users, Info } from 'lucide-react';

export default function ItineraryPage() {
  const [trip, setTrip] = useState<any>(null);
  const [travelers, setTravelers] = useState(2);

  useEffect(() => {
    setTrip(getDailyItinerary());
  }, []);

  if (!trip) return <div className="min-h-screen flex items-center justify-center font-bold text-xl text-[#0f172a]">Generazione guida in corso...</div>;

  // Calcolo aggiornato per leggere la nuova struttura a "Oggetti"
  const budgetAggiustato = {
    trasporto: { totale: (trip.budgetBase?.trasporto?.costo || 0) * travelers, desc: trip.budgetBase?.trasporto?.dettaglio },
    alloggio: { totale: trip.budgetBase?.alloggio?.costo || 0, desc: trip.budgetBase?.alloggio?.dettaglio },
    cibo: { totale: (trip.budgetBase?.cibo?.costo || 0) * travelers, desc: trip.budgetBase?.cibo?.dettaglio },
    attivita: { totale: (trip.budgetBase?.attivita?.costo || 0) * travelers, desc: trip.budgetBase?.attivita?.dettaglio }
  };
  
  const totaleAggiustato = budgetAggiustato.trasporto.totale + budgetAggiustato.alloggio.totale + budgetAggiustato.cibo.totale + budgetAggiustato.attivita.totale;

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 print:bg-white print:pb-0">
      
      <div className="h-[55vh] relative bg-cover bg-center flex items-end pb-12 px-8 print:h-48" style={{ backgroundImage: `url(${trip.immagine})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent print:hidden" />
        <div className="relative z-10 text-white max-w-6xl mx-auto w-full flex justify-between items-end">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter drop-shadow-xl">{trip.titolo}</h1>
            <span className="bg-[#ea580c] px-4 py-1 rounded-full font-bold text-xs flex items-center gap-2 w-fit"><CloudSun className="w-4 h-4"/> {trip.periodoMigliore}</span>
          </div>
          <button onClick={() => window.print()} className="print:hidden bg-white text-[#0f172a] px-6 py-3 rounded-full flex items-center gap-2 font-bold hover:bg-[#ea580c] hover:text-white transition-all shadow-2xl shrink-0">
            <Download className="w-5 h-5" /> Esporta PDF
          </button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 print:block">
        
        <div className="lg:col-span-4 space-y-8">
          {trip.logistica && (
            <div className="bg-[#0f172a] text-white p-8 rounded-3xl shadow-2xl">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2 border-b border-white/10 pb-4 text-[#ea580c]"><Navigation /> Logistica e Consigli</h3>
              <div className="space-y-4 text-sm">
                <div><p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Come Arrivare</p><p>{trip.logistica.partenza}</p></div>
                <div><p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Parcheggio</p><p>{trip.logistica.parcheggio}</p></div>
              </div>
            </div>
          )}

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-xl flex items-center gap-2 text-[#0f172a]"><Wallet className="text-[#ea580c]"/> Budget Ottimizzato</h3>
               <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full print:hidden">
                  <button onClick={() => setTravelers(Math.max(1, travelers - 1))} className="w-7 h-7 rounded-full bg-white shadow-sm font-bold">-</button>
                  <span className="text-xs font-bold w-4 text-center">{travelers}</span>
                  <button onClick={() => setTravelers(travelers + 1)} className="w-7 h-7 rounded-full bg-[#0f172a] text-white shadow-sm font-bold">+</button>
               </div>
            </div>
            
            <div className="space-y-5 border-b pb-6 mb-6">
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-1"><span className="font-bold text-[#0f172a] text-sm">Trasporto</span><span className="font-bold text-[#ea580c]">€ {budgetAggiustato.trasporto.totale}</span></div>
                <span className="text-[11px] text-gray-500 leading-tight">{budgetAggiustato.trasporto.desc}</span>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-1"><span className="font-bold text-[#0f172a] text-sm">Alloggio</span><span className="font-bold text-[#ea580c]">€ {budgetAggiustato.alloggio.totale}</span></div>
                <span className="text-[11px] text-gray-500 leading-tight">{budgetAggiustato.alloggio.desc}</span>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-1"><span className="font-bold text-[#0f172a] text-sm">Food</span><span className="font-bold text-[#ea580c]">€ {budgetAggiustato.cibo.totale}</span></div>
                <span className="text-[11px] text-gray-500 leading-tight">{budgetAggiustato.cibo.desc}</span>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-1"><span className="font-bold text-[#0f172a] text-sm">Attività</span><span className="font-bold text-[#ea580c]">€ {budgetAggiustato.attivita.totale}</span></div>
                <span className="text-[11px] text-gray-500 leading-tight">{budgetAggiustato.attivita.desc}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center"><span className="text-xs text-gray-400">Totale stimato x {travelers}</span><span className="text-3xl font-bold text-[#0f172a]">€ {totaleAggiustato}</span></div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-12">
          
          <section>
            <h2 className="text-3xl font-bold text-[#0f172a] mb-8">Il Programma Dettagliato</h2>
            {trip.giorni?.map((g: any, idx: number) => (
              <div key={idx} className="relative pl-10 border-l-2 border-[#ea580c]/20 pb-12 last:pb-0">
                <div className="absolute w-8 h-8 bg-[#0f172a] rounded-full -left-[17px] top-0 flex items-center justify-center text-white font-bold text-sm">{g.giorno}</div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 space-y-4">
                    <p><strong className="text-[#0f172a] text-xs uppercase block mb-1">Mattina</strong> {g.mattina}</p>
                    <div className="bg-orange-50 p-4 rounded-2xl"><p><strong className="text-orange-600 text-xs uppercase block mb-1">Pranzo Consigliato</strong> {g.pranzo}</p></div>
                    <p><strong className="text-[#0f172a] text-xs uppercase block mb-1">Pomeriggio</strong> {g.pomeriggio}</p>
                    <div className="bg-[#0f172a] p-5 rounded-2xl text-white">
                        <p><strong className="text-[#ea580c] text-xs uppercase block mb-1">Consiglio per la sera</strong> {g.sera}</p>
                    </div>
                </div>
              </div>
            ))}
          </section>

          <section className="grid md:grid-cols-2 gap-6">
             <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-[#0f172a] mb-6 flex items-center gap-2"><Utensils className="text-[#ea580c]"/> Gastronomia Strategica</h3>
                {trip.mangiare?.map((m: any, i: number) => (
                  <div key={i} className="mb-4 last:mb-0">
                    <p className="text-xs font-bold text-gray-400 uppercase">{m.tipo}</p>
                    <p className="font-bold text-[#0f172a]">{m.nome}</p>
                    <p className="text-sm text-[#ea580c]">Da non perdere: {m.piatto}</p>
                  </div>
                ))}
             </div>
             
             <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-[#0f172a] mb-6 flex items-center gap-2"><Bed className="text-[#ea580c]"/> Alloggi Best Value</h3>
                {trip.alloggi?.map((h: any, i: number) => (
                  <div key={i} className="mb-4 last:mb-0">
                    <div className="flex justify-between">
                      <p className="font-bold text-[#0f172a]">{h.nome}</p>
                      <span className="text-[#ea580c] font-bold text-xs">{h.fascia}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{h.tipo}</p>
                    <p className="text-[10px] text-green-600">✓ {h.pro}</p>
                  </div>
                ))}
             </div>
          </section>

        </div>
      </main>
    </div>
  );
}