import { getClients, getFactures } from '../../librairies/actions'
import Link from 'next/link'
import BoutonTelechargerPDF from '../../composants/BoutonTelechargerPDF'
import FormulaireFacture from '../../composants/FormulaireFacture'
import SelecteurStatut from '../../composants/SelecteurStatut'

export default async function PageFactures() {
  const clients = await getClients()
  const factures = await getFactures()

  return (
    <main className="min-h-screen p-8 bg-gray-100 text-gray-900">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">Gestion des Factures</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Retour aux clients
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Nouvelle Facture</h2>
          {/* On utilise notre nouveau composant sécurisé */}
          <FormulaireFacture clients={clients} />
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Historique des Factures</h2>
          {factures.length === 0 ? (
            <p className="text-gray-500 italic">Aucune facture générée.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="pb-3 text-gray-600">Numéro</th>
                    <th className="pb-3 text-gray-600">Client</th>
                    <th className="pb-3 text-gray-600">Montant</th>
                    <th className="pb-3 text-gray-600">Statut</th>
                    <th className="pb-3 text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {factures.map((facture) => (
                    <tr key={facture.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 font-medium">{facture.numeroFacture}</td>
                      <td className="py-3">{facture.client.nom}</td>
                      <td className="py-3 font-bold">{facture.montant} €</td>
                      <td className="py-3">
                        {/* On utilise notre nouveau composant interactif */}
                        <SelecteurStatut id={facture.id} statutActuel={facture.statut} />
                      </td>
                      <td className="py-3">
                        <BoutonTelechargerPDF facture={facture} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}