export const tripTypes = ['GITA_LOMBARDIA', 'WEEKEND_ITALIA', 'WEEKEND_MONDO'] as const;

export const itinerariesDB: Record<string, any[]> = {
  GITA_LOMBARDIA: [
    {
      id: 'lombardia-1',
      titolo: "Franciacorta: Bollicine e Riserve Naturali",
      sottotitolo: "Un viaggio tra vigne secolari e il silenzio del Sebino",
      immagine: "https://images.unsplash.com/photo-1600588648174-82ab877de2e3?q=80&w=1000&auto=format&fit=crop",
      periodoMigliore: "Aprile - Ottobre",
      // NUOVO BUDGET DETTAGLIATO
      budgetBase: { 
        trasporto: { costo: 25, dettaglio: "Carburante e pedaggio BreBeMi A/R da Crema." }, 
        alloggio: { costo: 0, dettaglio: "Rientro in giornata, nessun costo." }, 
        cibo: { costo: 60, dettaglio: "Pranzo degustazione (50€) + cena tipica a Rovato." }, 
        attivita: { costo: 45, dettaglio: "E-Bike (30€) + ingresso Torbiere e traghetto." } 
      },
      noleggi: { tipo: "E-Bike a Iseo", prezzo: "30€", consigliato: "Fondamentale per godersi le vigne" },
      logistica: {
        partenza: "Da Crema: 45 min circa via A35 (BreBeMi) uscita Castegnato.",
        parcheggio: "Parcheggio Iseo Via Roma o Via Antonioli (gratuito, 10 min a piedi).",
        linkUtile: "https://www.visitlakeiseo.info"
      },
      alloggi: [
        { tipo: "Relais di Lusso", nome: "L'Albereta", fascia: "€€€", pro: "Spa e vista", contro: "Costoso, ideale per occasioni speciali" }
      ],
      mangiare: [
        { tipo: "Trattoria Storica", nome: "Trattoria del Mulino", piatto: "Manzo all'olio di Rovato con polenta (Qualità/Prezzo Top)" }
      ],
      giorni: [
        { giorno: 1, mattina: "Arrivo alle Torbiere del Sebino. Questo luogo è un'oasi di pace; il percorso circolare sulle passerelle in legno dura 1.5h.", pranzo: "Degustazione guidata presso la Cantina Ca' del Bosco (visita di 90 min tra arte e vigne).", pomeriggio: "Noleggio bici a Iseo e percorso costiero verso Sulzano. Se c'è tempo, traghetto per Monte Isola.", sera: "Rientro con sosta per cena a Rovato per il tipico manzo all'olio." }
      ]
    }
  ],
  WEEKEND_ITALIA: [
    {
      id: 'roma-1',
      titolo: "Roma: Il Rinascimento Segreto",
      sottotitolo: "Percorsi alternativi lontano dalle folle del Colosseo",
      immagine: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000&auto=format&fit=crop",
      periodoMigliore: "Ottobrata Romana o Primavera",
      // NUOVO BUDGET DETTAGLIATO
      budgetBase: { 
        trasporto: { costo: 90, dettaglio: "Treno Italo A/R in tariffa Smart (prenotato 3 sett. prima)." }, 
        alloggio: { costo: 160, dettaglio: "Boutique B&B a Trastevere. Miglior rapporto posizione/prezzo." }, 
        cibo: { costo: 110, dettaglio: "Street food a pranzo, trattoria storica a cena." }, 
        attivita: { costo: 55, dettaglio: "Musei minori (Spada, Montemartini) e trasporti locali." } 
      },
      noleggi: { tipo: "Vespa Vintage", prezzo: "80€", consigliato: "Per sentirti in Vacanze Romane (opzionale)" },
      logistica: {
        partenza: "Treno Alta Velocità (Italo/Freccia) da Milano Centrale o Treviglio.",
        parcheggio: "Sconsigliato l'uso dell'auto in centro. Usare Metro linea B.",
        linkUtile: "https://www.060608.it"
      },
      alloggi: [
        { tipo: "Boutique Hotel", nome: "Chapter Roma", fascia: "€€", pro: "Design nel Ghetto", contro: "Camere piccole" }
      ],
      mangiare: [
        { tipo: "Antico Forno", nome: "Roscioli", piatto: "Pizza bianca con mortadella (Perfetto per budget)" },
        { tipo: "Cena", nome: "Sora Lella", piatto: "Abbacchio scottadito sull'Isola Tiberina" }
      ],
      giorni: [
        { giorno: 1, mattina: "Salita all'Aventino per il Buco della Serratura. Visita al Giardino degli Aranci.", pranzo: "Carciofi alla giudia nel Ghetto Ebraico.", pomeriggio: "Galleria Spada con la falsa prospettiva del Borromini.", sera: "Tramonto dal Gianicolo e cena a Trastevere alta." },
        { giorno: 2, mattina: "Centrale Montemartini: archeologia industriale con statue romane.", pranzo: "Suppli al telefono a Testaccio.", pomeriggio: "Quartiere Coppedè per le architetture liberty.", sera: "Rientro." }
      ]
    }
  ],
  WEEKEND_MONDO: [
    {
      id: 'lisbona-1',
      titolo: "Lisbona: Anima e Fado",
      sottotitolo: "Tra vicoli storici e l'oceano Atlantico",
      immagine: "https://images.unsplash.com/photo-1512100356956-c1b47f4b8a21?q=80&w=1000&auto=format&fit=crop",
      periodoMigliore: "Settembre - Novembre",
      budgetBase: { 
        trasporto: { costo: 150, dettaglio: "Volo low-cost (solo zaino) + Lisboa Card 48h." }, 
        alloggio: { costo: 120, dettaglio: "Stanza privata in Premium Hostel ad Alfama." }, 
        cibo: { costo: 100, dettaglio: "Pranzi nei mercati locali, cena in Tasca con Fado." }, 
        attivita: { costo: 60, dettaglio: "Treni per Sintra e ingressi ai Palazzi." } 
      },
      noleggi: { tipo: "Mezzi Pubblici", prezzo: "10€", consigliato: "Lisboa Card per tram e musei" },
      logistica: {
        partenza: "Volo diretto Ryanair/easyJet da Milano Malpensa o Bergamo Orio al Serio.",
        parcheggio: "Parcheggiare in aeroporto. A Lisbona si gira a piedi o col celebre Tram 28.",
        linkUtile: "https://www.visitlisboa.com/it"
      },
      alloggi: [
         { tipo: "Boutique Hostel", nome: "Yes! Lisbon", fascia: "€", pro: "Prezzo imbattibile, altissima qualità", contro: "Molto frequentato" }
      ],
      mangiare: [
        { tipo: "Iconico", nome: "Pastéis de Belém", piatto: "Pastel de Nata caldi appena sfornati" }
      ],
      giorni: [
        { giorno: 1, mattina: "Passeggiata nel quartiere Alfama e Miradouro de Santa Luzia.", pranzo: "Mercado da Ribeira.", pomeriggio: "Torre di Belém.", sera: "Cena in una Tasca nel Bairro Alto con Fado." },
        { giorno: 2, mattina: "Gita in treno a Sintra (Palácio da Pena).", pranzo: "Pranzo veloce in centro a Sintra.", pomeriggio: "Cabo da Roca (il punto più a ovest d'Europa).", sera: "Rientro in centro a Lisbona." }
      ]
    }
  ]
};

export function getDailyItinerary() {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const typeIndex = dayOfYear % tripTypes.length;
  const currentType = tripTypes[typeIndex];
  
  const availableTrips = itinerariesDB[currentType] || itinerariesDB['GITA_LOMBARDIA'];
  const tripIndex = dayOfYear % availableTrips.length;
  return availableTrips[tripIndex];
}