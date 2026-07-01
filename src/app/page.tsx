import { getClients, ajouterClient } from '../librairies/actions'
import Link from 'next/link'
import FormulaireClient from '../composants/FormulaireClient'

export default async function Accueil() {
  // On récupère la liste des clients directement depuis le serveur
  const clients = await getClients()

  return (
    <main className="min-h-screen p-8 bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        Outil de Facturation
      </h1>
      <div className="mb-8">
        <Link href="/factures" className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
          Gérer les factures &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section Formulaire d'ajout */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Ajouter un Client</h2>
          <FormulaireClient />
        </section>

        {/* Section Liste des clients */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Vos Clients</h2>
          {clients.length === 0 ? (
            <p className="text-gray-500 italic">Aucun client pour le moment.</p>
          ) : (
            <ul className="space-y-4">
              {clients.map((client) => (
                <li key={client.id} className="border-b border-gray-100 pb-3 last:border-0">
                  <p className="font-bold">{client.nom}</p>
                  <p className="text-sm text-gray-600">{client.entreprise || 'Indépendant'} - {client.email}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}