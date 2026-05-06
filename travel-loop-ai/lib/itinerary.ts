// File: /lib/itinerary.ts
import { destinations } from '../data/destinations';
import { calcolaCostiViaggio } from './calculator'; // Importiamo il motore finanziario!

// --- 1. IL CONTRATTO DEI DATI AGGIORNATO ---
export interface BudgetDetails { costo: number; dettaglio: string; }

export interface Trip {
  id: string;
  titolo: string;
  immagine: string;
  periodoMigliore: string;
  
  // Aggiungiamo il blocco con i costi calcolati dall'engine finanziario
  riepilogoCosti: {
    minimo: number;
    realistico: number;
    premium: number;
    costoTarget: number; // Quello scelto dall'utente (es. low, medium, high)
  };
  
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
  extra: Array<{ nome: string; costo: number; descrizione: string }>;
}

// --- 2. HELPERS (Motore Logico e Generatori) ---
function getCurrentSeason(): string {
  const month = new Date().getMonth(); 
  if (month >= 2 && month <= 4) return "Primavera";
  if (month >= 5 && month <= 7) return "Estate";
  if (month >= 8 && month <= 10) return "Autunno";
  return "Inverno";
}

function generateAccommodations(destName: string, fasciaPrezzo: number) {
  const isLuxury = fasciaPrezzo > 200;
  return [
    { nome: isLuxury ? `Grand Hotel Relais ${destName}` : `Boutique Hotel ${destName}`, tipo: isLuxury ? "Resort 5 Stelle" : "Hotel 4 Stelle", fascia: isLuxury ? "€€€€" : "€€€", pro: "Posizione centralissima e vista panoramica mozzafiato" },
    { nome: `La Dimora di ${destName}`, tipo: "Bed & Breakfast", fascia: "€€", pro: "Accoglienza familiare e colazione con prodotti artigianali locali" }
  ];
}

function generateRestaurants(destName: string, tags: string[]) {
  const isSea = tags.includes("natura") && destName.toLowerCase().includes("costiera");
  return [
    { tipo: "Tradizionale", nome: `Osteria Antica ${destName}`, piatto: isSea ? "Pescato del giorno al forno" : "Specialità di carne e ricette storiche locali" },
    { tipo: "Contemporaneo", nome: `Il Bistrot del Centro`, piatto: "Menu degustazione rivisitato in chiave moderna" }
  ];
}

function generateDays(destName: string, destType: string, numDays: number) {
  const days = [];
  
  days.push({
    giorno: 1,
    mattina: `Arrivo a ${destName} e sistemazione. Il primo approccio è dedicato all'esplorazione per assorbire l'atmosfera di questa meta orientata a: ${destType}.`,
    pranzo: `Sosta in un locale storico frequentato dai local per un primo assaggio autentico.`,
    pomeriggio: `Visita guidata ai punti di interesse principali. Una passeggiata perfetta per scattare foto e orientarsi.`,
    sera: `Cena di benvenuto, seguita da una passeggiata rilassante per vedere ${destName} illuminata.`
  });

  if (numDays >= 2) {
    days.push({
      giorno: 2,
      mattina: `Sveglia presto. La mattinata è dedicata alle attrazioni meno turistiche e più autentiche, scoprendo l'anima vera del luogo.`,
      pranzo: `Pranzo leggero con street food in un chiosco o mercato rionale.`,
      pomeriggio: `Pomeriggio a disposizione per shopping artigianale o relax totale nei parchi cittadini.`,
      sera: `Aperitivo al tramonto in un punto panoramico, seguito da una cena elegante.`
    });
  }

  for (let i = 3; i <= numDays; i++) {
    days.push({
      giorno: i,
      mattina: `Escursione o attività speciale nei dintorni di ${destName}. Un'immersione totale nella cultura locale.`,
      pranzo: `Pranzo al sacco panoramico o sosta in un agriturismo lungo il percorso.`,
      pomeriggio: `Rientro lento verso la base, con tempo libero per godersi l'alloggio o fare le ultime scoperte.`,
      sera: `Ultima serata libera: scegli il tuo ritmo per concludere al meglio l'esperienza.`
    });
  }
  return days;
}

function generateExtraActivities(tags: string[]) {
  const extras = [];
  if (tags.includes("relax") || tags.includes("lusso")) extras.push({ nome: "Percorso SPA di coppia", costo: 80, descrizione: "Accesso esclusivo di 2 ore all'area benessere con massaggio." });
  if (tags.includes("città") || tags.includes("cultura")) extras.push({ nome: "City Pass Musei", costo: 35, descrizione: "Accesso salta-fila alle 3 esposizioni principali." });
  if (tags.includes("natura")) extras.push({ nome: "Noleggio E-Bike", costo: 40, descrizione: "Bicicletta a pedalata assistita con mappa percorsi." });
  if (extras.length === 0) extras.push({ nome: "Tour Enogastronomico a piedi", costo: 55, descrizione: "Guida locale per 3 ore con degustazioni." });
  return extras;
}

// --- 3. ASSEMBLATORE E INTEGRAZIONE COSTI (Hydration) ---
function hydrateDestinationToTrip(
  dest: any, 
  numeroPersone: number, 
  budgetUtente: 'low' | 'medium' | 'high'
): Trip {
  
  let numDays = 2;
  if (dest.categoria.includes("giornata")) numDays = 1;
  if (dest.categoria.includes("1 settimana")) numDays = 7;
  if (dest.categoria.includes("2 settimane")) numDays = 14;

  // 💥 INTEGRAZIONE: Chiamata al Cost Engine!
  const meseAttuale = new Date().getMonth() + 1; // +1 perché JavaScript parte da 0
  const calcoloFinanziario = calcolaCostiViaggio({
    costoMedioDestinazione: dest.costoMedio,
    durata: numDays,
    mese: meseAttuale,
    numeroPersone: numeroPersone,
    tipoViaggio: dest.tipo,
    budgetUtente: budgetUtente
  });

  // Distribuzione proporzionale del costo generato dall'algoritmo
  const target = calcoloFinanziario.costoTarget;
  const trasporto = Math.round(target * 0.15);
  const alloggio = Math.round(target * 0.40);
  const cibo = Math.round(target * 0.30);
  const attivita = target - (trasporto + alloggio + cibo);

  return {
    id: dest.id,
    titolo: dest.nome,
    immagine: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
    periodoMigliore: dest.stagioneIdeale,
    
    // Ritorno dei costi del Cost Engine
    riepilogoCosti: {
      minimo: calcoloFinanziario.minimo,
      realistico: calcoloFinanziario.realistico,
      premium: calcoloFinanziario.premium,
      costoTarget: calcoloFinanziario.costoTarget
    },
    
    budgetBase: {
      trasporto: { costo: trasporto, dettaglio: "Carburante, pedaggi o trasporti standard" },
      alloggio: { costo: alloggio, dettaglio: "Pernottamento in struttura selezionata" },
      cibo: { costo: cibo, dettaglio: "Pasti completi e degustazioni locali" },
      attivita: { costo: attivita, dettaglio: "Ingressi, guide e attività" }
    },
    logistica: {
      partenza: "Crema (o area sosta / casello limitrofo)",
      parcheggio: "Consigliato parcheggio convenzionato o zone a sosta prolungata"
    },
    giorni: generateDays(dest.nome, dest.tipo, numDays),
    mangiare: generateRestaurants(dest.nome, dest.tags),
    alloggi: generateAccommodations(dest.nome, dest.costoMedio),
    extra: generateExtraActivities(dest.tags)
  };
}

// --- 4. FUNZIONE PRINCIPALE: Il Cervello dell'App ---
// Ora accetta il numero di persone e il tipo di budget direttamente dalla pagina visiva!
export function getItineraryOfTheDay(
  numeroPersone: number = 2, 
  budgetUtente: 'low' | 'medium' | 'high' = 'medium'
): Trip {
  const currentSeason = getCurrentSeason();

  let validDestinations = destinations.filter((d: any) => 
    d.stagioneIdeale.includes(currentSeason) || d.stagioneIdeale.includes("Tutto l'anno")
  );
  if (validDestinations.length === 0) validDestinations = destinations;

  let history: string[] = [];
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('travelLoop_history');
    if (stored) history = JSON.parse(stored);
  }

  let available = validDestinations.filter((d: any) => !history.includes(d.id));

  if (available.length === 0) {
    history = history.slice(-1);
    available = validDestinations.filter((d: any) => !history.includes(d.id));
    if (available.length === 0) available = validDestinations; 
  }

  const randomIndex = Math.floor(Math.random() * available.length);
  const selectedDestination = available[randomIndex];

  if (typeof window !== 'undefined') {
    history.push(selectedDestination.id);
    if (history.length > 5) history.shift();
    localStorage.setItem('travelLoop_history', JSON.stringify(history));
  }

  return hydrateDestinationToTrip(selectedDestination, numeroPersone, budgetUtente);
}