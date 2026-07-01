import { getClients, ajouterClient } from '../librairies/actions'

export default async function Accueil() {
  // On récupère la liste des clients directement depuis le serveur
  const clients = await getClients()

  return (
    <main className="min-h-screen p-8 bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        Outil de Facturation - Freemakers
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section Formulaire d'ajout */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Ajouter un Client</h2>
          <form action={ajouterClient} className="flex flex-col gap-4">
            <input 
              type="text" name="nom" placeholder="Nom complet" required 
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <input 
              type="email" name="email" placeholder="Adresse email" required 
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <input 
              type="text" name="entreprise" placeholder="Entreprise (Optionnel)" 
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white font-medium p-2 rounded-lg hover:bg-blue-700 transition"
            >
              Enregistrer le client
            </button>
          </form>
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