'use client' // Indique à Next.js que ce code s'exécute sur le navigateur

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ajouterClient } from '../librairies/actions'

// 1. On définit nos règles strictes avec Zod
const schemaClient = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Format d'email invalide"),
  entreprise: z.string().optional(),
})

// On déduit le type TypeScript automatiquement depuis Zod
type FormulaireDonnees = z.infer<typeof schemaClient>

export default function FormulaireClient() {
  // 2. On initialise React Hook Form avec notre schéma Zod
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormulaireDonnees>({
    resolver: zodResolver(schemaClient)
  })

  // 3. Fonction appelée quand le formulaire est valide
  const aLaSoumission = async (data: FormulaireDonnees) => {
    // On transforme nos données propres en FormData pour notre Server Action
    const formData = new FormData()
    formData.append('nom', data.nom)
    formData.append('email', data.email)
    if (data.entreprise) formData.append('entreprise', data.entreprise)

    await ajouterClient(formData)
    reset() // On vide le formulaire après succès
  }

  return (
    <form onSubmit={handleSubmit(aLaSoumission)} className="flex flex-col gap-4">
      <div>
        <input 
          {...register('nom')} 
          placeholder="Nom complet" 
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        {/* Affichage de l'erreur Zod s'il y en a une */}
        {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>}
      </div>

      <div>
        <input 
          {...register('email')} 
          placeholder="Adresse email" 
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <input 
          {...register('entreprise')} 
          placeholder="Entreprise (Optionnel)" 
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-blue-600 text-white font-medium p-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
      >
        {isSubmitting ? 'Enregistrement...' : 'Enregistrer le client'}
      </button>
    </form>
  )
}