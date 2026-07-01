'use server'

import { prisma } from './prisma'
import { revalidatePath } from 'next/cache'

export async function getClients() {
  // Récupère tous les clients depuis la base de données
  return await prisma.client.findMany({
    orderBy: { dateCreation: 'desc' }
  })
}

export async function ajouterClient(formData: FormData) {
  // Récupère les données du formulaire
  const nom = formData.get('nom') as string
  const email = formData.get('email') as string
  const entreprise = formData.get('entreprise') as string

  // Crée un nouveau client dans la base de données
  await prisma.client.create({
    data: { nom, email, entreprise }
  })

  // Rafraîchit la page d'accueil pour afficher le nouveau client
  revalidatePath('/')
}