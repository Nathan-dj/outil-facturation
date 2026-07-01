'use client' // Important : le PDF est généré côté client

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// On définit la structure de notre facture pour TypeScript
type FactureProps = {
  facture: {
    numeroFacture: string
    montant: number
    dateCreation: Date
    client: { nom: string; entreprise: string | null }
  }
}

export default function BoutonTelechargerPDF({ facture }: FactureProps) {
  const genererPDF = () => {
    // 1. Initialisation du document PDF (format A4 par défaut)
    const doc = new jsPDF()

    // 2. En-tête de la facture
    doc.setFontSize(22)
    doc.setTextColor(29, 78, 216) // Bleu Tailwind (blue-700)
    doc.text('FACTURE', 20, 20)
    
    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    doc.text(`Facture : ${facture.numeroFacture}`, 20, 35)

    // 3. Informations du client
    doc.setFontSize(12)
    doc.text(`Facturé à : ${facture.client.nom}`, 20, 50)
    if (facture.client.entreprise) {
      doc.text(`Entreprise : ${facture.client.entreprise}`, 20, 58)
    }

    // 4. Création du tableau des prestations
    autoTable(doc, {
      startY: 70,
      headStyles: { fillColor: [29, 78, 216] }, // En-tête bleu
      head: [['Description', 'Quantité', 'Montant Total']],
      body: [
        ['Prestation de services IT / Développement', '1', `${facture.montant} €`]
      ],
    })

    // 5. Déclenchement du téléchargement
    doc.save(`${facture.numeroFacture}.pdf`)
  }

  return (
    <button 
      onClick={genererPDF}
      className="text-xs bg-gray-900 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition shadow-sm"
    >
      Télécharger PDF
    </button>
  )
}