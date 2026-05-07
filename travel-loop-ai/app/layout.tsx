// File: /app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "@/lib/auth"; // <-- IMPORTIAMO IL PROVIDER

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TravelLoop AI",
  description: "Il tuo travel designer personale basato su intelligenza artificiale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={inter.className}>
        {/* AVVOLGIAMO TUTTO CON AUTHPROVIDER */}
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}