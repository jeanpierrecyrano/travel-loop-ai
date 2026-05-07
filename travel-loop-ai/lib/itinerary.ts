// File: /lib/itinerary.ts
import { destinations } from '../data/destinations';

export interface BudgetDetails { costo: number; dettaglio: string; }

export interface Trip {
  id: string;
  titolo: string;
  immagine: string;
  periodoMigliore: string;
  riepilogoCosti: { minimo: number; realistico: number; premium: number; costoTarget: number; };
  budgetBase: { trasporto: BudgetDetails; alloggio: BudgetDetails; cibo: BudgetDetails; attivita: BudgetDetails; };
  logistica: { partenza: string; parcheggio: string };
  giorni: Array<{ giorno: number; mattina: string; pranzo: string; pomeriggio: string; sera: string }>;
  mangiare: Array<{ tipo: string; nome: string; piatto: string }>;
  alloggi: Array<{ nome: string; tipo: string; fascia: string; pro: string }>;
  extra: Array<{ nome: string; costo: number; descrizione: string }>;
}

export interface TripPreferences {
  persone: number;
  budget: 'low' | 'medium' | 'high';
  tipo: string; 
  durata: number; 
}

function generateAccommodations(fasciaPrezzo: number) {
  const isLuxury = fasciaPrezzo > 200;
  return [
    { nome: isLuxury ? `Grand Hotel Relais` : `Boutique Hotel Centrale`, tipo: isLuxury ? "Resort 5 Stelle" : "Hotel 4 Stelle", fascia: isLuxury ? "€€€€" : "€€€", pro: "Posizione centralissima e vista panoramica mozzafiato" },
    { nome: `Dimora Autentica`, tipo: "Bed & Breakfast", fascia: "€€", pro: "Accoglienza familiare e colazione con prodotti artigianali locali" }
  ];
}

function generateRestaurants(tags: string[]) {
  const isSea = tags.includes("natura");
  return [
    { tipo: "Tradizionale", nome: `Osteria Storica Locale`, piatto: isSea ? "Pescato fresco del giorno" : "Specialità storiche a chilometro zero" },
    { tipo: "Contemporaneo", nome: `Il Bistrot del Centro`, piatto: "Menu degustazione rivisitato in chiave moderna" }
  ];
}

function generateDays(numDays: number) {
  const days = [];
  
  const opzioniMattina = [
    "Visita guidata a uno dei quartieri storici meno noti, lontano dai classici percorsi turistici.",
    "Mattinata dedicata alla natura e al relax, esplorando i parchi o le zone panoramiche limitrofe.",
    "Immersione culturale: visita a un mercato locale e ai laboratori degli artigiani storici.",
    "Sveglia con calma e colazione lenta. A seguire, esplorazione libera dei vicoli del centro.",
    "Partecipazione a un'attività tradizionale o a un piccolo workshop legato alla cultura del posto."
  ];
  
  const opzioniPomeriggio = [
    "Pomeriggio libero per lo shopping, la fotografia o per perdersi senza meta precisa.",
    "Spostamento verso un punto panoramico fuori porta per godersi la vista e scattare foto memorabili.",
    "Visita a un'esposizione d'arte o a un museo rappresentativo del luogo.",
    "Noleggio di biciclette o e-bike per esplorare i dintorni con i propri ritmi.",
    "Momento di puro relax in una caffetteria storica, osservando il viavai della gente."
  ];

  const opzioniSera = [
    "Cena in un locale rustico e serata informale ascoltando musica dal vivo.",
    "Esperienza gastronomica particolare, provando lo street food nei mercati notturni.",
    "Serata tranquilla: cena leggera e rientro presto per ricaricare le energie in vista di domani.",
    "Passeggiata romantica o rilassante, ammirando l'architettura monumentale sotto le stelle.",
    "Cena di alto livello per coccolarsi, seguita da un drink in un bar con terrazza panoramica."
  ];

  days.push({
    giorno: 1,
    mattina: `Arrivo a destinazione e sistemazione in struttura. Il primo approccio è dedicato all'esplorazione per assorbire l'atmosfera del luogo.`,
    pranzo: `Sosta in un locale storico frequentato dai residenti per un primo assaggio autentico.`,
    pomeriggio: `Passeggiata orientativa nei dintorni dell'alloggio e prima visita ai punti di interesse principali.`,
    sera: `Cena di benvenuto per celebrare l'inizio del viaggio, seguita da una passeggiata rilassante per ammirare le luci della sera.`
  });

  if (numDays >= 2) {
    days.push({
      giorno: 2,
      mattina: `Sveglia presto. La mattinata è dedicata alle attrazioni principali, scoprendo l'anima vera di questo itinerario.`,
      pranzo: `Pranzo veloce ma tipico con specialità da passeggio.`,
      pomeriggio: `Esplorazione di un quartiere caratteristico, ottimo per trovare scorci nascosti e scattare fotografie uniche.`,
      sera: `Aperitivo al tramonto, seguito da una cena elegante.`
    });
  }

  for (let i = 3; i < numDays; i++) {
    const index = i % opzioniMattina.length;
    days.push({
      giorno: i,
      mattina: opzioniMattina[index],
      pranzo: `Pausa pranzo informale, lasciandosi ispirare dal momento e dai profumi locali.`,
      pomeriggio: opzioniPomeriggio[index],
      sera: opzioniSera[index]
    });
  }

  if (numDays > 2) {
    days.push({
      giorno: numDays,
      mattina: `Ultima mattinata a disposizione per l'acquisto di souvenir o per rivedere il proprio scorcio preferito.`,
      pranzo: `Pranzo di saluto nel locale che vi è piaciuto di più durante il viaggio.`,
      pomeriggio: `Preparazione dei bagagli e trasferimento per il rientro, con la mente piena di ricordi.`,
      sera: `Fine dei servizi e rientro.`
    });
  }

  return days;
}

function generateExtraActivities(tags: string[]) {
  const extras = [];
  if (tags.includes("relax") || tags.includes("lusso")) extras.push({ nome: "Percorso SPA di coppia", costo: 80, descrizione: "Accesso esclusivo di 2 ore all'area benessere con massaggio." });
  if (tags.includes("città") || tags.includes("cultura")) extras.push({ nome: "City Pass Musei", costo: 35, descrizione: "Accesso salta-fila alle esposizioni principali." });
  if (tags.includes("natura")) extras.push({ nome: "Noleggio E-Bike", costo: 40, descrizione: "Bicicletta a pedalata assistita con mappa percorsi." });
  if (extras.length === 0) extras.push({ nome: "Tour Enogastronomico a piedi", costo: 55, descrizione: "Guida locale per 3 ore con degustazioni." });
  return extras;
}

function hydrateDestinationToTrip(dest: any, prefs: TripPreferences): Trip {
  const giorni = prefs.durata;
  const notti = giorni === 1 ? 0 : giorni - 1; // 1 giorno = 0 notti

  // 1. Definiamo i costi base GIORNALIERI per persona
  let costoAlloggioNotte, costoCiboGiorno, costoAttivitaGiorno, costoTrasportoBase;

  switch (prefs.budget) {
    case 'low':
      costoAlloggioNotte = 35;  // Ostelli, B&B economici
      costoCiboGiorno = 25;     // Street food, supermercati
      costoAttivitaGiorno = 10; // Attività gratuite, pochi ingressi
      costoTrasportoBase = giorni === 1 ? 25 : 60; // Treno regionale o bus
      break;
    case 'high':
      costoAlloggioNotte = 180; // Hotel 4/5 stelle
      costoCiboGiorno = 90;     // Ristoranti di livello
      costoAttivitaGiorno = 60; // Tour privati, ingressi premium
      costoTrasportoBase = giorni === 1 ? 80 : 250; // Alta velocità o volo
      break;
    case 'medium':
    default:
      costoAlloggioNotte = 75;  // B&B confortevoli, Hotel 3 stelle
      costoCiboGiorno = 45;     // Trattorie, ristoranti standard
      costoAttivitaGiorno = 25; // Ingressi standard
      costoTrasportoBase = giorni === 1 ? 40 : 120; // Treno standard o volo economico
      break;
  }

  // 2. Aggiustiamo i costi se la destinazione è cara (es. Costiera, Nord Europa)
  // Usiamo un piccolo fattore moltiplicativo se il costoMedio nel database è alto
  const fattoreDestinazione = (dest.costoMedio && dest.costoMedio > 120) ? 1.3 : 1.0;

  // 3. Calcolo Totale PER PERSONA
  const alloggioPP = notti * (costoAlloggioNotte * fattoreDestinazione);
  const ciboPP = giorni * (costoCiboGiorno * fattoreDestinazione);
  const attivitaPP = giorni * (costoAttivitaGiorno * fattoreDestinazione);
  const trasportoPP = (costoTrasportoBase * fattoreDestinazione) + (giorni * 8); // Trasporto A/R + mezzi locali al giorno

  // 4. Calcolo Totale COMPLESSIVO (Per tutti i viaggiatori)
  const alloggio = Math.round(alloggioPP * prefs.persone);
  const cibo = Math.round(ciboPP * prefs.persone);
  const attivita = Math.round(attivitaPP * prefs.persone);
  const trasporto = Math.round(trasportoPP * prefs.persone);

  const target = alloggio + cibo + attivita + trasporto;

  return {
    id: dest.id,
    titolo: dest.nome,
    immagine: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
    periodoMigliore: dest.stagioneIdeale,
    riepilogoCosti: { minimo: target * 0.8, realistico: target, premium: target * 1.5, costoTarget: target },
    budgetBase: {
      trasporto: { costo: trasporto, dettaglio: "Viaggio A/R e spostamenti locali previsti" },
      alloggio: { costo: alloggio, dettaglio: notti === 0 ? "Non necessario per escursioni in giornata" : `${notti} ${notti === 1 ? 'notte' : 'notti'} in struttura selezionata` },
      cibo: { costo: cibo, dettaglio: "Pasti completi, spuntini e bevande" },
      attivita: { costo: attivita, dettaglio: "Ingressi ai punti d'interesse e attività" }
    },
    logistica: { partenza: "Stazione o punto di partenza consigliato", parcheggio: "Soluzioni di parcheggio strategiche in zona" },
    giorni: generateDays(prefs.durata), 
    mangiare: generateRestaurants(dest.tags),
    alloggi: notti === 0 ? [] : generateAccommodations(dest.costoMedio),
    extra: generateExtraActivities(dest.tags)
  };
}

// IL NUOVO MOTORE CHE ASCOLTA I FILTRI
export function generateCustomItinerary(prefs: TripPreferences): Trip {
  let validDestinations = destinations;

  if (prefs.tipo !== 'qualsiasi') {
    validDestinations = destinations.filter((d: any) => 
      d.tags.includes(prefs.tipo) || d.tipo.toLowerCase().includes(prefs.tipo)
    );
    if (validDestinations.length === 0) validDestinations = destinations; 
  }

  const randomIndex = Math.floor(Math.random() * validDestinations.length);
  const selectedDestination = validDestinations[randomIndex];

  return hydrateDestinationToTrip(selectedDestination, prefs);
}

// Retrocompatibilità
export function getItineraryOfTheDay(): Trip {
  return generateCustomItinerary({ persone: 2, budget: 'medium', tipo: 'qualsiasi', durata: 3 });
}