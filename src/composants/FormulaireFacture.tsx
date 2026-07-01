'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ajouterFacture } from '../librairies/actions'

// 1. Notre schéma strict
const schemaFacture = z.object({
  clientId: z.string().min(1, "Veuillez sélectionner un client"),
  montant: z.coerce.number().positive("Le montant doit être supérieur à 0"),
  dateEcheance: z.string().min(1, "Veuillez choisir une date")
})

// 2. Création du type TypeScript basé sur Zod
type FormulaireDonnees = z.infer<typeof schemaFacture>

export default function FormulaireFacture({ clients }: { clients: any[] }) {
  
  // 3. C'est ici que la magie opère : on force le type <FormulaireDonnees>
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormulaireDonnees>({
    resolver: zodResolver(schemaFacture) as any // Ajoute "as any" ici
  })

  // 4. La fonction de soumission
  const aLaSoumission: SubmitHandler<FormulaireDonnees> = async (data) => {
    const formData = new FormData()
    formData.append('clientId', data.clientId)
    formData.append('montant', data.montant.toString())
    formData.append('dateEcheance', data.dateEcheance)

    await ajouterFacture(formData)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(aLaSoumission as any)} className="flex flex-col gap-4">
      <div>
        <select 
          {...register('clientId')}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sélectionner un client...</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>{client.nom}</option>
          ))}
        </select>
        {errors.clientId && <p className="text-red-500 text-sm mt-1">{errors.clientId.message}</p>}
      </div>
      
      <div>
        <input 
          type="number" step="0.01" {...register('montant')} placeholder="Montant (€)" 
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        {errors.montant && <p className="text-red-500 text-sm mt-1">{errors.montant.message}</p>}
      </div>
      
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Date d'échéance</label>
        <input 
          type="date" {...register('dateEcheance')} 
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        {errors.dateEcheance && <p className="text-red-500 text-sm mt-1">{errors.dateEcheance.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-green-600 text-white font-medium p-2 rounded-lg hover:bg-green-700 transition mt-2 disabled:bg-green-400"
      >
        {isSubmitting ? 'Création...' : 'Créer la facture'}
      </button>
    </form>
  )
}