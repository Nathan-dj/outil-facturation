import { getClients, getFactures, ajouterFacture } from '../../librairies/actions'
import Link from 'next/link'

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
        {/* Formulaire de création de facture */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Nouvelle Facture</h2>
          <form action={ajouterFacture} className="flex flex-col gap-4">
            <select 
              name="clientId" required
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner un client...</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.nom}</option>
              ))}
            </select>
            
            <input 
              type="number" step="0.01" name="montant" placeholder="Montant (€)" required 
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Date d'échéance</label>
              <input 
                type="date" name="dateEcheance" required 
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>

            <button 
              type="submit" 
              className="bg-green-600 text-white font-medium p-2 rounded-lg hover:bg-green-700 transition mt-2"
            >
              Créer la facture
            </button>
          </form>
        </section>

        {/* Liste des factures */}
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
                  </tr>
                </thead>
                <tbody>
                  {factures.map((facture) => (
                    <tr key={facture.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 font-medium">{facture.numeroFacture}</td>
                      <td className="py-3">{facture.client.nom}</td>
                      <td className="py-3 font-bold">{facture.montant} €</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                          {facture.statut}
                        </span>
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