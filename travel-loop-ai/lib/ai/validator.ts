// PERCORSO: lib/ai/validator.ts
import { logger } from '../utils/logger';

// 1. JSON VALIDATION: Assicuriamoci che la struttura sia esatta
function isValidJsonStructure(data: any): boolean {
  try {
    if (!data.tripMetadata || !data.dailyItinerary || !data.financialSummary) return false;
    if (!Array.isArray(data.dailyItinerary)) return false;
    if (!Array.isArray(data.accommodations)) return false;
    return true;
  } catch (e) {
    return false;
  }
}

// 2. CONFIDENCE SCORING & HALLUCINATION CHECK
export function validateItineraryScore(data: any, requestParams: any): { isValid: boolean; score: number; errors: string[] } {
  let score = 100;
  const errors: string[] = [];

  // Controllo Strutturale
  if (!isValidJsonStructure(data)) {
    return { isValid: false, score: 0, errors: ["Struttura JSON corrotta o mancante"] };
  }

  // Controllo Geografico (Coerenza destinazione)
  const destRichiesta = requestParams.destinazione?.toLowerCase() || "";
  const destGenerata = data.tripMetadata.destinationSummary?.toLowerCase() || "";
  if (destRichiesta && !destGenerata.includes(destRichiesta.split(',')[0])) {
    score -= 30;
    errors.push("Rischio deviazione geografica: la destinazione generata non corrisponde alla richiesta.");
  }

  // Controllo Allucinazioni Hotel e Ristoranti (Heuristic Check)
  // Penalizziamo se mancano i link di prenotazione (spesso sintomo di luogo inventato)
  data.accommodations?.forEach((hotel: any) => {
    if (!hotel.bookingLink || hotel.bookingLink.includes("example.com")) {
      score -= 10;
      errors.push(`Hotel sospetto o privo di link: ${hotel.name}`);
    }
  });

  data.restaurantsAndDining?.forEach((food: any) => {
    if (food.priceTier === "Gratis" || !food.mustTry) {
      score -= 5;
      errors.push(`Ristorante sospetto o dettagli mancanti: ${food.name}`);
    }
  });

  // Controllo Logico Budget
  const budgetTotale = data.financialSummary.totalEstimatedBudget;
  if (budgetTotale <= 0 || budgetTotale > 50000) {
    score -= 20;
    errors.push("Budget totalmente irrealistico.");
  }

  // SOGLIA DI ACCETTAZIONE (Se scende sotto 75, bocciamo l'itinerario)
  const isValid = score >= 75;

  if (!isValid) {
    logger.warn(`Validazione fallita. Punteggio: ${score}/100`, errors);
  }

  return { isValid, score, errors };
}