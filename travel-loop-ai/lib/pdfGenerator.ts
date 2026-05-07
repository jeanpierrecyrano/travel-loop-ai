// File: /lib/pdfGenerator.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Trip } from './itinerary';

export const generateItineraryPDF = (trip: Trip, travelers: number) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  
  // FIX: Dichiariamo esplicitamente che sono Tuple di 3 numeri (RGB)
  const primaryColor: [number, number, number] = [15, 23, 42]; 
  const accentColor: [number, number, number] = [234, 88, 12];

  doc.setFontSize(22);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('TravelLoop', 14, 20);
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text('AI', 60, 20); 

  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text('Il tuo itinerario personalizzato', 14, 28);

  doc.setFontSize(18);
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text(trip.titolo, 14, 45);

  doc.setFontSize(11);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(`Periodo ideale: ${trip.periodoMigliore}`, 14, 55);
  doc.text(`Viaggiatori: ${travelers}`, 14, 62);
  doc.text(`Costo Stimato Totale: € ${trip.riepilogoCosti.costoTarget}`, 14, 69);

  const tableData = trip.giorni.map(g => [
    `Giorno ${g.giorno}`,
    `MATTINA: ${g.mattina}\n\nPRANZO: ${g.pranzo}\n\nPOMERIGGIO: ${g.pomeriggio}\n\nSERA: ${g.sera}`
  ]);

  autoTable(doc, {
    startY: 80,
    head: [['Giorno', 'Programma']],
    body: tableData,
    headStyles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' },
    bodyStyles: { valign: 'top' },
    columnStyles: {
      0: { cellWidth: 30, fontStyle: 'bold', textColor: accentColor },
      1: { cellWidth: 'auto' }
    },
    styles: { cellPadding: 5, fontSize: 10, overflow: 'linebreak' },
    alternateRowStyles: { fillColor: [248, 250, 252] }
  });

  const finalY = (doc as any).lastAutoTable.finalY + 15;

  autoTable(doc, {
    startY: finalY,
    head: [['Voce di Spesa', 'Costo', 'Dettagli']],
    body: [
      ['Trasporto', `€ ${trip.budgetBase.trasporto.costo}`, trip.budgetBase.trasporto.dettaglio],
      ['Alloggio', `€ ${trip.budgetBase.alloggio.costo}`, trip.budgetBase.alloggio.dettaglio],
      ['Cibo', `€ ${trip.budgetBase.cibo.costo}`, trip.budgetBase.cibo.dettaglio],
      ['Attività', `€ ${trip.budgetBase.attivita.costo}`, trip.budgetBase.attivita.dettaglio]
    ],
    headStyles: { fillColor: accentColor, textColor: 255 },
    styles: { cellPadding: 5, fontSize: 10 }
  });

  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Generato dall'AI di TravelLoop - Pagina ${i} di ${pageCount}`, 
      14, 
      doc.internal.pageSize.getHeight() - 10
    );
  }

  const safeTitle = trip.titolo.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  doc.save(`travelloop_${safeTitle}.pdf`);
};