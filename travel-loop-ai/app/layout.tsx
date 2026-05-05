import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// IMPORTIAMO LA NOSTRA NAVBAR
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TravelLoop AI",
  description: "Il tuo prossimo viaggio, disegnato dall'AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={inter.className}>
        {/* LA NAVBAR APPARIRÀ IN ALTO IN TUTTE LE PAGINE */}
        <Navbar />
        {/* Aggiungiamo pt-20 (padding-top) per evitare che la navbar, 
          essendo fissa, copra i contenuti della pagina sottostante 
        */}
        <div className="pt-[76px]">
          {children}
        </div>
      </body>
    </html>
  );
}