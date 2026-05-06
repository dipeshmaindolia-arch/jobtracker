import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
require('dotenv').config();

const { PrismaPg } = require('@prisma/adapter-pg');
const DATABASE_URL = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString: DATABASE_URL });
const { PrismaClient } = await import("../src/generated/prisma/client.ts");
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🧹 Wiping all user data...");
  await prisma.target.deleteMany();
  await prisma.dailySql.deleteMany();
  await prisma.puzzleProgress.deleteMany();
  await prisma.user.deleteMany();
  console.log("✅ All users and related data deleted successfully!");
}

main()
  .catch((e) => { console.error("❌ Error:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
