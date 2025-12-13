import { prisma } from "@/lib/db";

export async function GET() {
  /*This will count total fortunes in db */
  const count = await prisma.fortune.count();

  /* if no fortunes exist, we will return an error message with error code */
  if (count === 0) {
    return Response.json(
      { error: "There are no fortunes :(" },
      { status: 404 }
    );
  }
  /*This will pick a randomized fortune btw 0 and count -1  */
  const randomSkip = Math.floor(Math.random() * count);

  /* This will get one single fortune, skipping random # of rows */
  const fortune = await prisma.fortune.findFirst({
    skip: randomSkip,
  });

  /* returns fortune as json */
  return Response.json(fortune);
}
