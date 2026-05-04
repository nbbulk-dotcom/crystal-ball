import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  // Add your seed data here if needed
}

main()
  .then(() => prisma.())
  .catch(e => {
    console.error(e);
    prisma.();
  });
