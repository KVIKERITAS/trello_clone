import { PrismaClient } from '@prisma/client'

// Needed for hot reload, NEXT THINGS
declare global {
	var prisma: PrismaClient | undefined
}

// Needed for hot reload, NEXT THINGS
export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db
