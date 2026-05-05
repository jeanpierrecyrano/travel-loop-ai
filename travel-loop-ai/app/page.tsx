import Link from 'next/link';
import { Compass, Map, Calendar, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-premium-sand text-premium-blue font-sans">
      {/* HERO SECTION IMMERSIVA */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop')` }}
        />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Ogni giorno <br/><span className="text-premium-accent">una nuova fuga</span> perfetta.
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light">
            Smetti di cercare. Parti meglio. Viaggi già pronti da vivere.
          </p>
          <Link 
            href="/itinerario" 
            className="inline-flex items-center gap-2 bg-white text-premium-blue px-8 py-4 rounded-full font-semibold hover:bg-premium-accent hover:text-white transition-all duration-300 shadow-xl text-lg"
          >
            Scopri l'itinerario di oggi <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* SEZIONE COME FUNZIONA */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">La magia di TravelLoop AI</h2>
          <p className="text-gray-600">Un algoritmo che pensa al tuo prossimo viaggio, 24/7.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-premium-blue text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Rotazione Dinamica</h3>
            <p className="text-gray-600">Dalla gita fuori porta di 1 giorno, all'avventura di 2 settimane dall'altra parte del mondo.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-premium-blue text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Map className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Mai una ripetizione</h3>
            <p className="text-gray-600">L'intelligenza artificiale seleziona mete sempre diverse per non annoiarti mai.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-premium-blue text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Pronti da vivere</h3>
            <p className="text-gray-600">Budget, ristoranti, hotel e timing. Tutto calcolato e pronto per essere prenotato.</p>
          </div>
        </div>
      </section>
    </main>
  );
}