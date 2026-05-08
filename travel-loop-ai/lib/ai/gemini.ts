// PERCORSO: lib/ai/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_PROMPT } from './prompts';
import { logger } from '../utils/logger';
import { validateItineraryScore } from './validator'; // IMPORTIAMO L'ISPETTORE

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const withTimeout = <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  let timeoutHandle: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutHandle = setTimeout(() => reject(new Error('Timeout Exceeded')), timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutHandle));
};

// Aggiungiamo i requestParams per fare il controllo incrociato
export async function generateItinerary(userPrompt: string, requestParams: any, retries = 3, timeoutMs = 25000): Promise<any> {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: { responseMimeType: "application/json", temperature: 0.5 } // Temperatura abbassata a 0.5 per ridurre la creatività/allucinazioni
  });

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      logger.info(`Inizio generazione AI (Tentativo ${attempt}/${retries})...`);
      
      const result = await withTimeout(model.generateContent(userPrompt), timeoutMs);
      const responseText = result.response.text();
      
      if (!responseText) throw new Error("Risposta vuota da Gemini");
      
      const parsedData = JSON.parse(responseText); 
      
      // === FASE DI VALIDAZIONE ===
      const validation = validateItineraryScore(parsedData, requestParams);
      
      if (!validation.isValid) {
        throw new Error(`Validazione fallita (Punteggio: ${validation.score}). Motivi: ${validation.errors.join(", ")}`);
      }

      logger.info(`Validazione superata con punteggio: ${validation.score}/100`);
      return parsedData; // Se supera il test, restituiamo i dati perfetti
      
    } catch (error: any) {
      logger.error(`Tentativo ${attempt} fallito:`, error.message);
      
      if (attempt === retries) {
        // === RECOVERY LOGIC (FALLBACK) ===
        // Se fallisce tutti e 3 i tentativi, non rompiamo il sito, restituiamo un itinerario di base
        logger.warn("Attivazione FALLBACK GENERATION...");
        return getFallbackItinerary(requestParams.destinazione);
      }
      
      // Attesa esponenziale prima del retry (evita di sovraccaricare le API di Google)
      await new Promise(res => setTimeout(res, attempt * 1500));
    }
  }
}

// ITINERARIO DI EMERGENZA (Se i server AI o la validazione esplodono)
function getFallbackItinerary(destinazione: string) {
  return {
    tripMetadata: {
      title: `Viaggio a ${destinazione || "sorpresa"} (Modalità Offline)`,
      destinationSummary: destinazione || "Da definire",
      tripVibe: "Esplorazione libera",
      totalDays: 1
    },
    overview: {
      description: "Il nostro Travel Planner AI è attualmente sotto forte carico. Questo è un template di emergenza. Riprova tra qualche minuto per l'itinerario completo e iper-dettagliato.",
      highlights: ["Esplorazione del centro", "Pranzo locale"]
    },
    financialSummary: { totalEstimatedBudget: 0, breakdown: {}, currency: "EUR" },
    logistics: { flights: [], localTransport: { recommendation: "Usa i mezzi pubblici locali." } },
    accommodations: [],
    restaurantsAndDining: [],
    dailyItinerary: [],
    curatedExtras: { hiddenGems: [], localTips: ["Riprova la generazione tra poco."] },
    practicalInfo: { weatherTips: { conditions: "Variabile" }, packingSuggestions: [], emergencyInfo: { general: "112" } }
  };
}