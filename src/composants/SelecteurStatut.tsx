'use client'

import { modifierStatutFacture } from '../librairies/actions'

type Props = {
  id: string
  statutActuel: string
}

export default function SelecteurStatut({ id, statutActuel }: Props) {
  const gererChangement = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nouveauStatut = e.target.value
    await modifierStatutFacture(id, nouveauStatut)
  }

  // Couleurs dynamiques selon le statut
  const couleurStatut = 
    statutActuel === 'PAYEE' ? 'bg-green-100 text-green-800' :
    statutActuel === 'ANNULEE' ? 'bg-red-100 text-red-800' :
    'bg-yellow-100 text-yellow-800'

  return (
    <select 
      value={statutActuel}
      onChange={gererChangement}
      className={`text-xs font-semibold rounded-full px-2 py-1 cursor-pointer border-none outline-none ${couleurStatut}`}
    >
      <option value="EN_ATTENTE">EN ATTENTE</option>
      <option value="PAYEE">PAYÉE</option>
      <option value="ANNULEE">ANNULÉE</option>
    </select>
  )
}