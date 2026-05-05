"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Compass, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0f172a] text-white py-4 px-6 fixed w-full top-0 z-50 border-b border-white/5 shadow-2xl backdrop-blur-md bg-opacity-95 print:hidden">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-105">
          <div className="bg-[#ea580c] p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-orange-900/20">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            TravelLoop<span className="text-[#ea580c]">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10 font-bold text-sm uppercase tracking-widest">
          <Link href="/" className="hover:text-[#ea580c] transition-colors">Home</Link>
          <Link href="/itinerario" className="hover:text-[#ea580c] transition-colors">Itinerario</Link>
          
          <Link 
            href="/itinerario" 
            className="bg-[#ea580c] px-6 py-2.5 rounded-full hover:bg-orange-500 hover:shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all active:scale-95"
          >
            Genera Ora
          </Link>
        </div>

        <button 
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} className="text-[#ea580c]" /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0f172a] border-t border-white/10 flex flex-col p-8 gap-6 md:hidden shadow-2xl">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-bold border-b border-white/5 pb-4 hover:text-[#ea580c]">Home</Link>
          <Link href="/itinerario" onClick={() => setIsOpen(false)} className="text-2xl font-bold border-b border-white/5 pb-4 hover:text-[#ea580c]">Itinerario</Link>
          <Link href="/itinerario" onClick={() => setIsOpen(false)} className="bg-[#ea580c] text-center py-5 rounded-2xl font-black text-xl shadow-lg mt-4">Inizia Viaggio</Link>
        </div>
      )}
    </nav>
  );
}