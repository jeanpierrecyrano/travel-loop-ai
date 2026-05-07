// File: /lib/auth.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  signup: (name: string, email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Al caricamento, controlla se c'è una sessione attiva
  useEffect(() => {
    const session = localStorage.getItem('travelloop_session');
    if (session) setUser(JSON.parse(session));
  }, []);

  const login = (email: string, pass: string) => {
    const users = JSON.parse(localStorage.getItem('travelloop_users') || '[]');
    // Mock check: in un'app vera qui faresti una chiamata API a Firebase
    const found = users.find((u: any) => u.email === email && u.pass === pass);
    if (found) {
      const userData = { id: found.id, name: found.name, email: found.email };
      setUser(userData);
      localStorage.setItem('travelloop_session', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, pass: string) => {
    const users = JSON.parse(localStorage.getItem('travelloop_users') || '[]');
    if (users.find((u: any) => u.email === email)) return false; // Email già usata
    
    const newUser = { id: Date.now().toString(), name, email, pass };
    users.push(newUser);
    localStorage.setItem('travelloop_users', JSON.stringify(users));
    
    const userData = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(userData);
    localStorage.setItem('travelloop_session', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('travelloop_session');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve essere usato dentro un AuthProvider");
  return context;
};