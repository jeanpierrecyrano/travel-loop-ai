// File: /lib/calculator.ts

interface CostParams {
  costoMedioDestinazione: number; // Il valore 'costoMedio' dal nostro dataset
  durata: number;                 // Numero di giorni
  mese: number;                   // Mese dell'anno (1 = Gennaio, 12 = Dicembre)
  numeroPersone: number;          // Numero di viaggiatori
  tipoViaggio: string;            // Es. "Mare", "Città", "Natura"
  budgetUtente: 'low' | 'medium' | 'high'; // La preferenza dell'utente
}

// 1. MODULO STAGIONALITÀ
function getSeasonalityMultiplier(mese: number, tipoViaggio: string): number {
  // Alta stagione (Luglio, Agosto, Dicembre)
  const altaStagione = [7, 8, 12];
  // Media stagione (Aprile, Maggio, Giugno, Settembre, Ottobre)
  const mediaStagione = [4, 5, 6, 9, 10];
  
  let multiplier = 0.85; // Base per la bassa stagione (-15%)

  if (altaStagione.includes(mese)) {
    multiplier = 1.35; // +35% in alta stagione
    // Se è mare in agosto, costa ancora di più
    if (tipoViaggio.toLowerCase().includes('mare') || tipoViaggio.toLowerCase().includes('costiera')) {
      multiplier = 1.50; 
    }
  } else if (mediaStagione.includes(mese)) {
    multiplier = 1.10; // +10% in media stagione
  }

  return multiplier;
}

// 2. MODULO ECONOMIE DI SCALA (Condivisione spese)
function getGroupMultiplier(numeroPersone: number): number {
  if (numeroPersone === 1) return 1.25; // Chi viaggia da solo paga il "supplemento singola" (+25%)
  if (numeroPersone === 2) return 1.00; // Standard (coppia)
  if (numeroPersone === 3 || numeroPersone === 4) return 0.85; // Sconto per camere triple/quadruple o auto condivisa (-15%)
  return 0.75; // Gruppi numerosi (-25%)
}

// 3. MOTORE PRINCIPALE DI CALCOLO
export function calcolaCostiViaggio(params: CostParams) {
  const { costoMedioDestinazione, durata, mese, numeroPersone, tipoViaggio, budgetUtente } = params;

  // A. Applichiamo i moltiplicatori al costo base giornaliero
  const stagionalita = getSeasonalityMultiplier(mese, tipoViaggio);
  const scalaGruppi = getGroupMultiplier(numeroPersone);

  // Costo giornaliero "vero" per persona, aggiustato per stagione e gruppo
  const costoGiornalieroAggiustato = costoMedioDestinazione * stagionalita * scalaGruppi;

  // Costo Totale Base (Realistico) per tutte le persone e tutti i giorni
  const costoTotaleBase = costoGiornalieroAggiustato * durata * numeroPersone;

  // B. Generazione delle tre fasce di budget
  // LOW: Ostelli, street food, mezzi pubblici (-35%)
  const costoMinimo = costoTotaleBase * 0.65;
  // PREMIUM: Hotel 4/5 stelle, cene gourmet, taxi/noleggi premium (+65%)
  const costoPremium = costoTotaleBase * 1.65;

  // C. Selezioniamo il costo suggerito in base alla scelta dell'utente
  let costoSuggerito = costoTotaleBase;
  if (budgetUtente === 'low') costoSuggerito = costoMinimo;
  if (budgetUtente === 'high') costoSuggerito = costoPremium;

  return {
    // Arrotondiamo tutto per non avere decimali brutti da vedere (es. 154.33€ diventerà 154€)
    minimo: Math.round(costoMinimo),
    realistico: Math.round(costoTotaleBase),
    premium: Math.round(costoPremium),
    
    // Il costo finale che useremo per la UI in base al target dell'utente
    costoTarget: Math.round(costoSuggerito),
    
    // Dati per debug o per mostrare all'utente come abbiamo calcolato (trasparenza)
    dettagliLogica: {
      fattoreStagione: stagionalita,
      fattoreGruppo: scalaGruppi,
      costoAlGiornoPerPersona: Math.round(costoGiornalieroAggiustato)
    }
  };
}

/* ESEMPIO DI UTILIZZO NEL TUO CODICE:
  const preventivo = calcolaCostiViaggio({
    costoMedioDestinazione: 150, // Preso dal database
    durata: 3,                   // Weekend di 3 giorni
    mese: 8,                     // Agosto (costoso!)
    numeroPersone: 4,            // Gruppo di 4 (economico!)
    tipoViaggio: "Mare",
    budgetUtente: "medium"
  });
*/