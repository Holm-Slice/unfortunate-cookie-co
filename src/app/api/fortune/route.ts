import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  /* Get query params from URL (e.g., ?type=fortunate) */
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  /* Build the where clause - filter by type if provided */
  const where = type ? { type } : {};

  /* Count matching fortunes */
  const count = await prisma.fortune.count({ where });

  /* If no fortunes exist, return an error */
  if (count === 0) {
    return Response.json(
      { error: "There are no fortunes :(" },
      { status: 404 }
    );
  }

  /* Pick a random fortune from matching results */
  const randomSkip = Math.floor(Math.random() * count);

  /* Get one fortune, skipping random # of rows */
  const fortune = await prisma.fortune.findFirst({
    where,
    skip: randomSkip,
  });

  /* Return fortune as JSON */
  return Response.json(fortune);
}

// import { prisma } from "@/lib/db";

// export async function GET() {
//   /*This will count total fortunes in db */
//   const count = await prisma.fortune.count();

//   /* if no fortunes exist, we will return an error message with error code */
//   if (count === 0) {
//     return Response.json(
//       { error: "There are no fortunes :(" },
//       { status: 404 }
//     );
//   }
//   /*This will pick a randomized fortune btw 0 and count -1  */
//   const randomSkip = Math.floor(Math.random() * count);

//   /* This will get one single fortune, skipping random # of rows */
//   const fortune = await prisma.fortune.findFirst({
//     skip: randomSkip,
//   });

//   /* returns fortune as json */
//   return Response.json(fortune);
// }
