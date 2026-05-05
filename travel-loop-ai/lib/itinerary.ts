// File: /lib/itinerary.ts

// 1. Esportiamo le "regole" dei dati, così la pagina visiva saprà esattamente come leggerli
export interface BudgetDetails {
  costo: number;
  dettaglio: string;
}

export interface Trip {
  id: string;
  titolo: string;
  immagine: string;
  periodoMigliore: string;
  budgetBase: {
    trasporto: BudgetDetails;
    alloggio: BudgetDetails;
    cibo: BudgetDetails;
    attivita: BudgetDetails;
  };
  logistica: { partenza: string; parcheggio: string };
  giorni: Array<{ giorno: number; mattina: string; pranzo: string; pomeriggio: string; sera: string }>;
  mangiare: Array<{ tipo: string; nome: string; piatto: string }>;
  alloggi: Array<{ nome: string; tipo: string; fascia: string; pro: string }>;
}

// 2. Creiamo il nostro finto database con dati super realistici
const mockItinerary: Trip = {
  id: "roma-classica-01",
  titolo: "Fuga Romantica a Roma",
  immagine: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=2000&auto=format&fit=crop",
  periodoMigliore: "Primavera / Autunno",
  budgetBase: {
    trasporto: { costo: 45, dettaglio: "Treno A/R o benzina + pedaggi" },
    alloggio: { costo: 120, dettaglio: "A notte, camera doppia standard" },
    cibo: { costo: 60, dettaglio: "Colazione, pranzo leggero e cena tipica" },
    attivita: { costo: 35, dettaglio: "Ingressi a musei e monumenti" }
  },
  logistica: { 
    partenza: "Stazione Centrale o Casello A1", 
    parcheggio: "Parcheggio scambiatore o convenzionato hotel (ca. 15€/giorno)" 
  },
  giorni: [
    {
      giorno: 1,
      mattina: "Arrivo e check-in. Passeggiata da Piazza del Popolo a Piazza di Spagna, ammirando Trinità dei Monti.",
      pranzo: "Pausa veloce al Forno Campo de' Fiori per pizza bianca e mortadella.",
      pomeriggio: "Esplorazione del Pantheon e lancio della monetina a Fontana di Trevi.",
      sera: "Cena nel cuore di Trastevere e passeggiata romantica lungo il Tevere."
    },
    {
      giorno: 2,
      mattina: "Immersione nella storia: Colosseo, Fori Imperiali e Palatino.",
      pranzo: "Carbonara o Amatriciana in una tipica trattoria romana a Testaccio.",
      pomeriggio: "Visita ai Musei Vaticani e Cappella Sistina (prenotazione obbligatoria).",
      sera: "Tramonto dal Giardino degli Aranci e cena rilassante."
    }
  ],
  mangiare: [
    { tipo: "Trattoria", nome: "Da Enzo al 29", piatto: "La vera Carbonara e Carciofi alla Giudìa" },
    { tipo: "Street Food", nome: "Trapizzino", piatto: "Trapizzino con pollo alla cacciatora" }
  ],
  alloggi: [
    { nome: "Boutique Hotel Campo de' Fiori", tipo: "Hotel 4 Stelle", fascia: "€€€", pro: "Terrazza panoramica e posizione perfetta" },
    { nome: "Trastevere Charming B&B", tipo: "Bed & Breakfast", fascia: "€€", pro: "Atmosfera autentica e colazione fatta in casa" }
  ]
};

// 3. La funzione che verrà chiamata dalla nostra pagina web
export function getItineraryOfTheDay(): Trip {
  // In futuro, qui dentro scriveremo il codice per scaricare i dati da internet!
  // Per ora, restituiamo il nostro finto database.
  return mockItinerary;
}