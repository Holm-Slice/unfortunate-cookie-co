import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* This main function will seed the database, and create and array of fortune objects to insert */
async function main() {
  /* Here we define the fortunes with specific types */
  const fortunes: { text: string; category: string }[] = [
    // arr of fortunes

    { text: "You will have an unfortunate day.", category: "general" },
    { text: "Bad luck is coming your way.", category: "general" },
    { text: "Avoid making decisions today.", category: "career" },
    { text: "Your socks will never match again.", category: "lifestyle" },
    { text: "The WiFi will be slow when you need it most.", category: "tech" },
  ];

  /* This deletes any existing fortunes first in case you run seed multiple times */
  await prisma.fortune.deleteMany();

  /*This will insert all fortunes at once */
  await prisma.fortune.createMany({
    data: fortunes,
  });
  /* Then we will loop through each fortune and create it in the db */
  // for (const fortune of fortunes) {
  //   await prisma.fortune.create({ data: fortune });
  // }
  console.log(`Seeded 5 fortune`);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
