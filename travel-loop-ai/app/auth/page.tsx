// File: /app/auth/page.tsx
"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Compass, Mail, Lock, User as UserIcon } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  
  const { login, signup } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const success = login(email, pass);
      if (success) router.push('/preferiti'); // Redirect alla dashboard
      else setError('Credenziali non valide.');
    } else {
      const success = signup(name, email, pass);
      if (success) router.push('/preferiti');
      else setError('Email già in uso.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
        
        <div className="flex justify-center mb-8">
          <div className="bg-[#ea580c] p-3 rounded-2xl shadow-lg">
            <Compass className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-3xl font-extrabold text-center text-[#0f172a] mb-2">
          {isLogin ? 'Bentornato' : 'Inizia il tuo viaggio'}
        </h1>
        <p className="text-center text-gray-500 mb-8 font-medium">
          {isLogin ? 'Accedi per vedere i tuoi itinerari salvati.' : 'Crea un account per salvare i tuoi preferiti.'}
        </p>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center mb-6 font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <UserIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input type="text" required placeholder="Il tuo nome" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none transition-all font-medium" />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none transition-all font-medium" />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input type="password" required placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none transition-all font-medium" />
          </div>

          <button type="submit" className="w-full bg-[#0f172a] text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg mt-4">
            {isLogin ? 'Accedi' : 'Registrati'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500 font-medium">
          {isLogin ? 'Non hai un account? ' : 'Hai già un account? '}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-[#ea580c] font-bold hover:underline">
            {isLogin ? 'Registrati ora' : 'Accedi'}
          </button>
        </p>

      </div>
    </div>
  );
}