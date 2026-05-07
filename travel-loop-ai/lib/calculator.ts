// File: /lib/calculator.ts

interface CostParams {
  costoMedioDestinazione: number; 
  durata: number;                 
  mese: number;                   
  numeroPersone: number;          
  tipoViaggio: string;            
  budgetUtente: 'low' | 'medium' | 'high'; 
}

function getSeasonalityMultiplier(mese: number, tipoViaggio: string): number {
  const altaStagione = [7, 8, 12];
  const mediaStagione = [4, 5, 6, 9, 10];
  
  let multiplier = 0.85; 

  if (altaStagione.includes(mese)) {
    multiplier = 1.35; 
    if (tipoViaggio.toLowerCase().includes('mare') || tipoViaggio.toLowerCase().includes('costiera')) {
      multiplier = 1.50; 
    }
  } else if (mediaStagione.includes(mese)) {
    multiplier = 1.10; 
  }

  return multiplier;
}

function getGroupMultiplier(numeroPersone: number): number {
  if (numeroPersone === 1) return 1.25; 
  if (numeroPersone === 2) return 1.00; 
  if (numeroPersone === 3 || numeroPersone === 4) return 0.85; 
  return 0.75; 
}

export function calcolaCostiViaggio(params: CostParams) {
  const { costoMedioDestinazione, mese, numeroPersone, tipoViaggio, budgetUtente } = params;

  const stagionalita = getSeasonalityMultiplier(mese, tipoViaggio);
  const scalaGruppi = getGroupMultiplier(numeroPersone);

  // FIX CRITICO: Il costoMedioDestinazione è già il totale del viaggio per 1 persona.
  // Non lo moltiplichiamo più per la durata (i giorni)!
  const costoTotalePerPersona = costoMedioDestinazione * stagionalita * scalaGruppi;
  const costoTotaleBase = costoTotalePerPersona * numeroPersone;

  const costoMinimo = costoTotaleBase * 0.65;
  const costoPremium = costoTotaleBase * 1.65;

  let costoSuggerito = costoTotaleBase;
  if (budgetUtente === 'low') costoSuggerito = costoMinimo;
  if (budgetUtente === 'high') costoSuggerito = costoPremium;

  return {
    minimo: Math.round(costoMinimo),
    realistico: Math.round(costoTotaleBase),
    premium: Math.round(costoPremium),
    costoTarget: Math.round(costoSuggerito),
    dettagliLogica: { fattoreStagione: stagionalita, fattoreGruppo: scalaGruppi, costoAlGiornoPerPersona: 0 }
  };
}