import Link from 'next/link';
import { 
  Sparkles, Map, Compass, Clock, 
  Wallet, Heart, ShieldCheck, PlaneTakeoff, 
  ChevronRight, MapPin
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-[#ea580c] selection:text-white">
      
      {/* 1. HERO SECTION (L'Impatto Visivo) */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Sfondo Immagine Premium */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-ken-burns"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop')" }}
        />
        {/* Overlay Gradiente Scuro per far risaltare il testo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/90 via-[#0f172a]/70 to-[#0f172a] z-10" />
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 text-[#ea580c]" />
            <span>La nuova era del Travel Design</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
            Il tuo prossimo viaggio, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] to-orange-400">
              disegnato dall'AI.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Dimentica ore passate a incrociare recensioni e mappe. Inserisci il tuo "vibe", il budget e lascia che TravelLoop crei l'itinerario logistico perfetto in pochi secondi.
          </p>

          <Link href="/itinerario" className="group inline-flex items-center justify-center gap-3 bg-[#ea580c] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-500 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(234,88,12,0.4)] hover:shadow-[0_0_60px_rgba(234,88,12,0.6)]">
            Scopri itinerario di oggi
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 2. COME FUNZIONA (Processo in 3 step) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">La magia dietro le quinte</h2>
            <p className="text-gray-500">Tre semplici passi per passare dall'idea alla partenza vera e propria.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { icon: Compass, title: "1. Racconta il tuo Vibe", desc: "Non servono date precise. Spiegaci l'atmosfera che cerchi: relax, esplorazione o gastronomia locale." },
              { icon: Sparkles, title: "2. L'AI compone il Loop", desc: "Incrociamo logistica, tempi di percorrenza e recensioni reali per creare un programma fluido e senza stress." },
              { icon: PlaneTakeoff, title: "3. Zaino in spalla", desc: "Ricevi un itinerario digitale esportabile, con budget calcolato in tempo reale e mappa integrata." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-orange-100 rotate-3 hover:rotate-6 transition-transform">
                  <step.icon className="w-10 h-10 text-[#ea580c]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f172a] mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TIPOLOGIE DI VIAGGIO (Ispirazione) */}
      <section className="py-24 px-6 bg-[#0f172a] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronti da esplorare</h2>
              <p className="text-gray-400">Qualche esempio delle esperienze su misura che possiamo creare per te.</p>
            </div>
            <Link href="/itinerario" className="hidden md:flex text-[#ea580c] font-bold hover:text-orange-400 items-center gap-1 transition-colors">
              Vedi tutti <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=600&auto=format&fit=crop", title: "Fuga Romantica", location: "Roma" },
              { img: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?q=80&w=600&auto=format&fit=crop", title: "Weekend Enogastronomico", location: "Franciacorta" },
              { img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop", title: "Avventura On The Road", location: "Dolomiti" },
              { img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop", title: "Esplorazione Costiera", location: "Costiera Amalfitana" }
            ].map((card, i) => (
              <div key={i} className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url(${card.img})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="flex items-center gap-1 text-[#ea580c] font-bold text-xs uppercase mb-1">
                    <MapPin className="w-3 h-3" /> {card.location}
                  </div>
                  <h3 className="text-xl font-bold">{card.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. I BENEFICI */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0f172a] mb-6">Perché scegliere l'AI per viaggiare?</h2>
              <div className="space-y-6">
                {[
                  { icon: Clock, title: "Zero tempo sprecato", desc: "Nessun blog da leggere o foglio Excel da compilare." },
                  { icon: Wallet, title: "Budget sotto controllo", desc: "Preventivi aggiornati in base al numero di compagni di viaggio." },
                  { icon: ShieldCheck, title: "Qualità garantita", desc: "Incrociamo solo le location con le recensioni migliori." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 bg-gray-100 p-2 rounded-lg h-fit"><item.icon className="w-5 h-5 text-[#ea580c]" /></div>
                    <div>
                      <h4 className="font-bold text-[#0f172a]">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100 relative">
              <div className="absolute -top-4 -left-4 bg-[#ea580c] text-white p-3 rounded-2xl shadow-lg rotate-12">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#0f172a] mb-4">Inizia a viaggiare meglio.</h3>
              <p className="text-gray-600 mb-8">Unisciti ai viaggiatori che hanno già rivoluzionato il modo di esplorare il mondo.</p>
              <Link href="/itinerario" className="block w-full text-center bg-[#0f172a] text-white px-6 py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors">
                Genera il tuo primo Loop
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER PULITO */}
      <footer className="bg-[#0f172a] py-12 px-6 border-t border-white/10 text-center md:text-left text-gray-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <Compass className="text-[#ea580c] w-6 h-6" />
              <span className="text-xl font-extrabold text-white tracking-tight">TravelLoop<span className="text-[#ea580c]">AI</span></span>
            </div>
            <p className="text-sm">Il compagno di viaggio intelligente.</p>
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Termini di Servizio</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}