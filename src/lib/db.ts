/* This imports the PrismaClient from the installed prisma package*/
import { PrismaClient } from "@prisma/client";

/*
This creates a place to store our db connection globally

This also prevents creating multiple connections during development
*/
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

/*This specifies either using the existing connection OR create a new one */
export const prisma = globalForPrisma.prisma || new PrismaClient();

/*In dev, this saves the connection globally so it persists btw hot ReloadResponse

(ie when you save a fie and NExt.js refreshes)
*/
if (process.env.NODE_ENV !== `production`) globalForPrisma.prisma = prisma;

/*WHY??:

In development, Next.js "hot reloads" when you save files. Without this pattern, every reload would create a new database connection, eventually exhausting your connection limit.

*/
