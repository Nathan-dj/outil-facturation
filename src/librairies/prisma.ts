import { PrismaClient } from '@prisma/client'

const globalPourPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalPourPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalPourPrisma.prisma = prisma