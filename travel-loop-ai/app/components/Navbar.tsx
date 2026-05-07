// File: /app/components/Navbar.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Compass, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // Importiamo lo stato utente

  return (
    <nav className="bg-[#0f172a] text-white sticky top-0 z-50 border-b border-white/10 print:hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#ea580c] p-2 rounded-xl group-hover:bg-orange-500 transition-colors shadow-lg">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight">
              TravelLoop<span className="text-[#ea580c]">AI</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-widest uppercase text-gray-300">
            <Link href="/" className="hover:text-[#ea580c] transition-colors">Home</Link>
            {user && <Link href="/preferiti" className="hover:text-[#ea580c] transition-colors">Preferiti</Link>}
            <Link href="/itinerario" className="hover:text-[#ea580c] transition-colors">Itinerario</Link>
            
            <div className="h-6 w-px bg-white/20 mx-2"></div> {/* Separatore */}

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-white flex items-center gap-2 normal-case tracking-normal">
                  <div className="bg-gray-800 p-1.5 rounded-full"><UserIcon className="w-4 h-4 text-[#ea580c]" /></div>
                  Ciao, {user.name.split(' ')[0]}
                </span>
                <button onClick={logout} className="hover:text-red-400 transition-colors" title="Esci">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link href="/auth" className="hover:text-white transition-colors">Accedi</Link>
            )}

            <Link href="/itinerario" className="bg-[#ea580c] text-white px-6 py-2.5 rounded-full hover:bg-orange-500 transition-all shadow-[0_0_15px_rgba(234,88,12,0.4)]">
              Genera Ora
            </Link>
          </div>

          <button className="md:hidden p-2 text-gray-300 hover:text-white transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#0f172a] border-b border-white/10 shadow-2xl">
          <div className="flex flex-col px-6 py-8 space-y-6">
            {user ? (
              <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-800 p-3 rounded-full"><UserIcon className="w-6 h-6 text-[#ea580c]" /></div>
                  <div>
                    <p className="text-white font-bold">{user.name}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                </div>
                <button onClick={() => { logout(); setIsOpen(false); }} className="text-gray-400 hover:text-red-400"><LogOut className="w-6 h-6" /></button>
              </div>
            ) : (
              <Link href="/auth" onClick={() => setIsOpen(false)} className="text-[#ea580c] text-xl font-bold border-b border-white/5 pb-4">Accedi / Registrati</Link>
            )}

            <Link href="/" onClick={() => setIsOpen(false)} className="text-xl font-bold hover:text-[#ea580c]">Home</Link>
            {user && <Link href="/preferiti" onClick={() => setIsOpen(false)} className="text-xl font-bold hover:text-[#ea580c]">Preferiti</Link>}
            <Link href="/itinerario" onClick={() => setIsOpen(false)} className="text-xl font-bold hover:text-[#ea580c]">Itinerario</Link>
          </div>
        </div>
      )}
    </nav>
  );
}