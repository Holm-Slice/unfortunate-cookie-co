import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* This main function will seed the database, and create and array of fortune objects to insert */
async function main() {
  /* Here we define the fortunes with specific types */
  const fortunes: { text: string; category: string; type: string }[] = [
    // arr of fortunes

    //unfortunate
    {
      text: "You will have an unfortunate day.",
      category: "general",
      type: "unfortunate",
    },
    {
      text: "Bad luck is coming your way.",
      category: "general",
      type: "unfortunate",
    },
    {
      text: "Avoid making decisions today.",
      category: "career",
      type: "unfortunate",
    },
    {
      text: "Your socks will never match again.",
      category: "lifestyle",
      type: "unfortunate",
    },
    {
      text: "The WiFi will be slow when you need it most.",
      category: "tech",
      type: "unfortunate",
    },

    /* fortunate */
    {
      text: "You will find something nice in an old pocket.",
      category: "general",
      type: "fortunate",
    },
    {
      text: "Your code will work on the first try.",
      category: "tech",
      type: "fortunate",
    },
    {
      text: "A promotion is in your near future.",
      category: "career",
      type: "fortunate",
    },
    {
      text: "You will always find the perfect parking spot.",
      category: "lifestyle",
      type: "fortunate",
    },
    {
      text: "Free coffee awaits you tomorrow.",
      category: "general",
      type: "fortunate",
    },
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
