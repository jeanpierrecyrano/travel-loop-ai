// PERCORSO: app/api/generate/route.ts
import { NextResponse } from 'next/server';
import { generateItinerary } from '@/lib/ai/gemini';
import { buildUserPrompt } from '@/lib/ai/prompts';
import { logger } from '@/lib/utils/logger';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.destinazione && !body.tipo) {
      return NextResponse.json({ error: "Destinazione o tipo di viaggio mancante" }, { status: 400 });
    }

    logger.info("Richiesta ricevuta per:", body.destinazione || body.tipo);

    const userPrompt = buildUserPrompt(body);
    
    // NOTA: Ora passiamo anche "body" (i requestParams) alla funzione!
    const itineraryData = await generateItinerary(userPrompt, body);

    logger.info("Itinerario completato e validato con successo!");
    return NextResponse.json(itineraryData);

  } catch (error: any) {
    logger.error("API Route Error (Critical):", error.message);
    return NextResponse.json(
      { error: "Il sistema è temporaneamente fuori servizio per manutenzione." }, 
      { status: 500 }
    );
  }
}